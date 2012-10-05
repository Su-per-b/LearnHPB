/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.DuctworkView');

goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.DuctworkModel} dataModel The model to display.
 */
lgb.view.DuctworkView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this.dataModel = dataModel;
  this._NAME = 'lgb.view.DuctworkView';
};
goog.inherits(lgb.view.DuctworkView, lgb.view.ViewBase);


/**
 * Initializes the View
 * loads the geometry
 */
lgb.view.DuctworkView.prototype.init = function() {
  this.loadScene_();
};

/**
 * Initiates the scene load process.
 * @private
 */
lgb.view.DuctworkView.prototype.loadScene_ = function() {

  var path = lgb.Config.ASSETS_BASE_PATH + 'ductwork_and_diffusers/scene.json';
  this.loader_ = new THREE.SceneLoaderEx();
  
  this.loader_.load(path, this.d(this.onSceneLoaded_));
};



/**
 * @override
 * @protected
 */
lgb.view.DuctworkView.prototype.fake = function(event) {
  var x = 0;
};


/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.DuctworkView.prototype.onSceneLoaded_ = function(result) {
  /**@type THREE.Scene */
  var scene = result['scene'];

  lgb.logInfo('DuctworkView.onSceneLoaded_');
  this.masterGroup = new THREE.Object3D();
  
  var len = scene.children.length;
  for (var i = 0; i < len; i++) {
    
      var mesh = scene.children.pop();
    
      if (mesh != null) {
        
        //TODO:RAJ target selectable meshes with "groups"
        if (mesh.name != 'ductingObject') {
          var event = new lgb.events.SelectableLoaded(mesh);
          this.dispatchLocal(event);
        }
        
        this.masterGroup.add(mesh);
      } else {
        
        console.log ("test");
        
      }
    

  }
  

  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;

  this.requestAddToWorld(this.masterGroup);

  //delete this.loader_;

};


/**
 * @override
 * @param {lgb.events.DataModelChanged } event The event.
 * @protected
 */
lgb.view.DuctworkView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.DuctworkView.prototype.updateVisible_ = function() {
  var m = this.masterGroup.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup.children[i].visible = this.dataModel.isVisible;
  }
};
