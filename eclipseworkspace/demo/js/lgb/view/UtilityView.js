/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.UtilityView');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.UtilityView = function() {
  lgb.view.ViewBase.call(this, null);

  this._NAME = 'lgb.view.UtilityView';

};
goog.inherits(lgb.view.UtilityView, lgb.view.ViewBase);


/**
 * Initializes the View
 * loads the geometry
 */
lgb.view.UtilityView.prototype.init = function() {
  this.loadScene_();
};

/**
 * Initiates the scene load process.
 * @private
 */
lgb.view.UtilityView.prototype.loadScene_ = function() {

 this.loadScene_();
};

lgb.view.UtilityView.prototype.loadScene_ = function() {


   var path = lgb.Config.ASSETS_BASE_PATH + 'utility/axis_marker/scene.json';
   
   this.loader_ = new THREE.SceneLoaderEx();
   this.loader_.load(path, this.d(this.onSceneLoaded_));

};





/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.UtilityView.prototype.onSceneLoaded_ = function(result) {
  
  lgb.logInfo('UtilityView.onSceneLoaded_');
  
  var scene = result['scene'];
  this.masterGroup = new THREE.Object3D();
  var len = scene.children.length;
  
  for (var i = 0; i < len; i++) {
      var mesh = scene.children.pop();
      this.masterGroup.add(mesh);
  }
  
  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;
  
  this.requestAddToWorld(this.masterGroup);

  //delete this.loader_;
  this.updateVisible_();
  
  this.dispatchLocal(new lgb.events.ViewInitialized());
    
};


