/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.LightingView');

goog.require('lgb.view.BaseView3dScene');
goog.require('lgb.model.GridModel');
goog.require('lgb.model.BuildingHeightModel');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {lgb.model.LightingModel} dataModel The model to display.
 */
lgb.view.LightingView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'lighting';
  
 lgb.view.BaseView3dScene.call(this, dataModel);

  this.pendantGeom  = null;
  this.recessedGeom = null;
};
goog.inherits(lgb.view.LightingView,lgb.view.BaseView3dScene);




/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.LightingView.prototype.onSceneLoaded_ = function() {
  

  for (var i = this.scene_.children.length - 1; i >= 0; i--) {
      var mesh = this.scene_.children.pop();
      
      if (mesh.name == 'recessed' ) {
        
        this.recessedGeom = mesh.geometry;
        
        this.gridRecessed = new lgb.model.GridModel (
          this.appData_ .gridRecessed,
          mesh.geometry.getDimensions()
          );
    
      } else if (mesh.name == 'pendant') {
        
        this.pendantGeom = mesh.geometry;
        
        this.gridPendant = new lgb.model.GridModel (
          this.appData_ .gridPendant, 
          mesh.geometry.getDimensions()
          );
      }
      
      
      this.masterGroup_.add(mesh);
  }
  

  
  this.requestAddToWorld(this.masterGroup_);
  this.updateAllFromModel_();
  
  this.dispatchVisibilityNodes_();
  


};

lgb.view.LightingView.prototype.dispatchVisibilityNodes_ = function() {


  var node = new lgb.model.vo.VisibilityNode('Lighting', this.masterGroup_, 0 );
  
 
  this.triggerLocal(e.VisibilityNodesLoaded, node);

  return;
}

/**
 * @override
 * @param {lgb.events.Event} event The event.
 * @protected
 */
lgb.view.LightingView.prototype.onChange = function(event) {
  
  var whatIsDirty = event.payload;
  
  if (whatIsDirty) {
    
    if (whatIsDirty.lightingType) {
      this.buildGrid_();
      //this.updateVisible_();
    }
    if (whatIsDirty.isVisible) {
      //this.updateVisible_();
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


  var m = this.masterGroup_.children.length;

  for (var i = this.masterGroup_.children.length - 1; i >= 0; i--) {
    this.masterGroup_.remove(this.masterGroup_.children[i]);
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
      this.masterGroup_.add(light);
    
    }
    
  };
  
  this.masterGroup_.position.x = gridModel.centeredPosition.x;
  this.masterGroup_.position.z = gridModel.centeredPosition.z;
  this.masterGroup_.position.y = gridModel.centeredPosition.y;
  
};



/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.LightingView.prototype.updateVisible_ = function() {
  var m = this.masterGroup_.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup_.children[i].visible = this.dataModel.isVisible;
  }
};
