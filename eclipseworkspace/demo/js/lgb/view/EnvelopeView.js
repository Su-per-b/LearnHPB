/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.EnvelopeView');

goog.require('goog.userAgent');
goog.require('lgb.ThreeUtils');
goog.require('lgb.events.CamerasLoaded');
goog.require('lgb.events.ViewInitialized');
goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.model.EnvelopeModel} dataModel The model to display.
 */
lgb.view.EnvelopeView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  /**@const */
  this._NAME = 'lgb.view.EnvelopeView';

  /**@type {Array.<THREE.Geometry>} */
  this.floorGeometry = [];
  this.floorObjs = [];
  this.init_();
};
goog.inherits(lgb.view.EnvelopeView, lgb.view.ViewBase);


/**
 * Initializes the View
 * and loads the meshes from remote files
 * @private
 */
lgb.view.EnvelopeView.prototype.init_ = function() {
  this.floorDimensions = null;
  this.loadScene_();
};


/**
 * Initiates the loading of the scene file.
 * @private
 */
lgb.view.EnvelopeView.prototype.loadScene_ = function() {

  var path = lgb.Config.ASSETS_BASE_PATH + 'envelope/scene-bin.js';
  this.loader_ = new THREE.SceneLoaderEx();

  this.loader_.load(path, this.d(this.onSceneLoaded_));
};


/**
 * Event handler called when the the scene is loaded.
 * @private
 * @param {Object} result From the THREE.js lib.
 */
lgb.view.EnvelopeView.prototype.onSceneLoaded_ = function(result) {
  /**@type THREE.Scene */
  var scene = result['scene'];
  var groups = result['groups'];
  var cameras = result['cameras'];




  //var objects = result['objects'];

  this.each(scene.objects, lgb.ThreeUtils.chromeBlinkingFix);
  this.floorObjs = lgb.ThreeUtils.convertGroupHashToMeshHash(groups);
  this.masterGroup = new THREE.Object3D();
  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;
  this.requestAddToWorld(this.masterGroup);

  this.updateAllFromModel_();
  delete this.loader_;
  this.dispatchLocal(new lgb.events.ViewInitialized());

  if (cameras !== undefined) {
    var e = new lgb.events.CamerasLoaded(cameras);
    this.dispatchLocal(e);
  }


};


/**
 * @override
 * @param {lgb.events.DataModelChanged} event The event.
 * @protected
 */
lgb.view.EnvelopeView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateAllFromModel_ = function() {
  this.makeFloors_();
  this.updateVisible_();
};


/**
 * @private
 */
lgb.view.EnvelopeView.prototype.makeFloors_ = function() {

  //var geometry = this.floorGeometry[this.dataModel.floorHeight];

  var geometry = this.floorObjs[this.dataModel.floorHeight + 'ft'].geometry;


  this.floorDimensions = geometry.getDimensions();

  //var floorMesh = this.floorObjs[this.dataModel.floorHeight + 'ft']



  this.dimensions = geometry.getDimensions();


  var m = this.masterGroup.children.length;

  for (var i = this.masterGroup.children.length - 1; i >= 0; i--) {
    this.masterGroup.remove(this.masterGroup.children[i]);
  }

  var l = this.dataModel.floorCount;

  for (var j = 0; j < l; j++) {
    var floor = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
    floor.castShadow = true;
    floor.receiveShadow = true;
    
    floor.position.z -= j * this.dimensions.z;
    this.masterGroup.add(floor);
  }

};





/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.EnvelopeView.prototype.updateVisible_ = function() {
  var m = this.masterGroup.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup.children[i].visible = this.dataModel.isVisible;
  }
};












