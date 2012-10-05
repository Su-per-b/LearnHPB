/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
goog.provide('lgb.view.FurnitureView');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.FurnitureModel} dataModel The model to display.
 */
lgb.view.FurnitureView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

 // this.dataModel = dataModel;
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

  this.loadSceneCollada_();
 // this.loadSceneThreeJS_();
};

lgb.view.FurnitureView.prototype.loadSceneThreeJS_ = function() {

  //colada Loader
   //var path = lgb.Config.ASSETS_BASE_PATH + 'test/optimized_marker/scene.json';
   var path = lgb.Config.ASSETS_BASE_PATH + 'eLADShadedDetail/optimized_marker/scene.json';
   
   
   this.loader_ = new THREE.SceneLoader();
   this.loader_.load(path, this.d(this.onSceneLoadedThreeJS_));

};

lgb.view.FurnitureView.prototype.loadSceneCollada_ = function() {

  //colada Loader
   var path = lgb.Config.ASSETS_BASE_PATH + 'eLADShadedDetail/furniture_layoutA_low.dae';
   this.loader_ = new THREE.ColladaLoader();
   this.loader_.load(path, this.d(this.onSceneLoadedCollada_));

};


/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.FurnitureView.prototype.onSceneLoadedCollada_ = function(result) {
  
  lgb.logInfo('FurnitureView.onSceneLoadedCollada_');
 
  //return;
  
  var scene = result['scene'];
  this.masterGroup = new THREE.Object3D();
  var len = scene.children.length-1;
  
  for (var i = 0; i < len; i++) {
      var mesh = scene.children.pop();
      
      this.masterGroup.add(mesh);
  }
  

  this.masterGroup.position = new THREE.Vector3(0,-3, -6);
  this.masterGroup.scale = new THREE.Vector3(0.4, 0.4,0.4);
  
  if (scene.up.y == 1) {
    this.masterGroup.rotation = new THREE.Vector3(-1.570758, 0, 0);
  }
  
  this.requestAddToWorld(this.masterGroup);

  //delete this.loader_;
  this.updateVisible_();
  
  this.dispatchLocal(new lgb.events.ViewInitialized());
    
};

/**
 * Event handler called when the scene file is loaded
 * and all needed assets are loaded too.
 * @param {Object} result The result from the THREE.js lib.
 * @private
 */
lgb.view.FurnitureView.prototype.onSceneLoadedThreeJS_ = function(result) {
  
  lgb.logInfo('FurnitureView.onSceneLoaded_');
  
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