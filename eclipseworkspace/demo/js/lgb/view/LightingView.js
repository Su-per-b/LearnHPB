/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.LightingView');

goog.require('lgb.view.ViewBase');
goog.require('lgb.model.GridModel');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.LightingView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this.dataModel = dataModel;
  this._NAME = 'lgb.view.LightingView';
  this.pendantGeom  = null;
  this.recessedGeom = null;
  
  
};
goog.inherits(lgb.view.LightingView, lgb.view.ViewBase);


/**
 * Initializes the View
 * loads the geometry
 */
lgb.view.LightingView.prototype.init = function() {
  this.loadScene_();
};

/**
 * Initiates the scene load process.
 * @private
 */
lgb.view.LightingView.prototype.loadScene_ = function() {

   var path = lgb.Config.ASSETS_BASE_PATH + 'lighting/scene-bin.js';
   this.loader_ = new THREE.SceneLoaderEx();
   this.loader_.load(path, this.d(this.onSceneLoaded_));
};


/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.LightingView.prototype.onSceneLoaded_ = function(result) {
  
  lgb.logInfo('LightingView.onSceneLoaded_');
  
  /**@type THREE.Scene */
  var scene = result['scene'];
  var groups = result['groups'];
  var appData = result['appData'];
  

  
  
  this.masterGroup = new THREE.Object3D();
  
  
  for (var i = scene.objects.length - 1; i >= 0; i--) {
      var mesh = scene.objects[i];
      

      if (mesh.name == 'recessed') {
        
        this.recessedGeom = mesh.geometry;
        
        this.gridRecessed = new lgb.model.GridModel (
          appData.gridRecessed,
          mesh.geometry.getDimensions()
          );
    
      } else if (mesh.name == 'pendant') {
        
        this.pendantGeom = mesh.geometry;
        
        this.gridPendant = new lgb.model.GridModel (
          appData.gridPendant, 
          mesh.geometry.getDimensions()
          );
      }
      
      
      this.masterGroup.add(mesh);
  }
  

  
  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;

  this.requestAddToWorld(this.masterGroup);

  delete this.loader_;
  
  this.updateAllFromModel_();
 //this.dispatchLocal(new lgb.events.ViewInitialized());
  

};


/**
 * @override
 * @param {lgb.events.DataModelChanged } event The event.
 * @protected
 */
lgb.view.LightingView.prototype.onChange = function(event) {
  
  var whatIsDirty = event.payload;
  
  if (whatIsDirty) {
    
    if (whatIsDirty.lightingType) {
      this.buildGrid_();
      this.updateVisible_();
    }
    if (whatIsDirty.isVisible) {
      this.updateVisible_();
    }
    
  } else {
    
    this.updateVisible_();
  }

  

};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.LightingView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
  this.buildGrid_();
};

/**
 * Updates this view to reflect the changes in the type of the 
 * lighting selected
 * @private
 */
lgb.view.LightingView.prototype.buildGrid_ = function() {


  var m = this.masterGroup.children.length;

  for (var i = this.masterGroup.children.length - 1; i >= 0; i--) {
    this.masterGroup.remove(this.masterGroup.children[i]);
  }
  
  var geometry;
  var gridModel;
  
  
  if (this.dataModel.lightingType == lgb.model.LightingModel.State.PENDANT) {
    
    geometry = this.pendantGeom;
    gridModel = this.gridPendant;
    
  } else if (this.dataModel.lightingType == lgb.model.LightingModel.State.RECESSED) {
    
    geometry = this.recessedGeom;
    gridModel = this.gridRecessed;
    
  } else {
    
  }
  
  this.buildGridHelper_( gridModel, geometry );
  

};

/**
 * @override
 * @param {Object } event The event.
 * @param {lgb.model.GridModel} gridModel.
 * @protected
 */
lgb.view.LightingView.prototype.buildGridHelper_ = function(gridModel,geometry) {
  

  for (var c=0; c < gridModel.columnCount; c++) {
    for (var r=0; r < gridModel.rowCount; r++) {
      
      var light = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
      light.castShadow = true;
      light.receiveShadow = true;
      
      light.position = gridModel.getCellPosition(r,c);
      this.masterGroup.add(light);
    
    }
    
  };
  
  this.masterGroup.position = gridModel.centeredPosition
  
  
}



/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.LightingView.prototype.updateVisible_ = function() {
  var m = this.masterGroup.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup.children[i].visible = this.dataModel.isVisible;
  }
};
