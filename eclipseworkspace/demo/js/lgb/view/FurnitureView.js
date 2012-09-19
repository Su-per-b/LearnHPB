/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.FurnitureView');

goog.require('lgb.view.ViewBase');
goog.require('lgb.model.GridModel');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.FurnitureView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this.dataModel = dataModel;
  this._NAME = 'lgb.view.FurnitureView';


};
goog.inherits(lgb.view.FurnitureView, lgb.view.ViewBase);


/**
 * Initializes the View
 * loads the geometry
 */
lgb.view.FurnitureView.prototype.init = function() {
  this.loadScene_();
};

/**
 * Initiates the scene load process.
 * @private
 */
lgb.view.FurnitureView.prototype.loadScene_ = function() {

   var path = lgb.Config.ASSETS_BASE_PATH + 'furniture/scene.js';
   this.loader_ = new THREE.SceneLoaderEx();
   this.loader_.load(path, this.d(this.onSceneLoaded_));
};


/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.FurnitureView.prototype.onSceneLoaded_ = function(result) {
  
  lgb.logInfo('FurnitureView.onSceneLoaded_');
  
  /**@type THREE.Scene */
  var scene = result['scene'];
  var groups = result['groups'];
  var appData = result['appData'];
  
  this.masterGroup = new THREE.Object3D();
  
  
  for (var i = scene.objects.length - 1; i >= 0; i--) {
      var mesh = scene.objects[i];
      this.masterGroup.add(mesh);
  }
  
  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;

  this.requestAddToWorld(this.masterGroup);

  delete this.loader_;
  
  this.updateAllFromModel_();
 this.dispatchLocal(new lgb.events.ViewInitialized());
  

};


/**
 * @override
 * @param {lgb.events.DataModelChanged } event The event.
 * @protected
 */
lgb.view.FurnitureView.prototype.onChange = function(event) {
  

  

};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.FurnitureView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
  this.buildGrid_();
};





/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.FurnitureView.prototype.updateVisible_ = function() {
  var m = this.masterGroup.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup.children[i].visible = this.dataModel.isVisible;
  }
};
