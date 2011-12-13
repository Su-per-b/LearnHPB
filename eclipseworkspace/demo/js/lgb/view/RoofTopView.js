/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.RoofTopView');


goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.events.Object3DLoaded');
goog.require('lgb.view.ViewBase');



/**
 * MVC View for the RoofTop Unit
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {lgb.model.RoofTopModel} dataModel The data model to display.
 */
lgb.view.RoofTopView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);

  this.dataModel = dataModel;
  this._NAME = 'lgb.view.RoofTopView';


};
goog.inherits(lgb.view.RoofTopView, lgb.view.ViewBase);



/**
 * Initializes the View
 */
lgb.view.RoofTopView.prototype.init = function() {
  this.loadScene_();
};

/**
 * begins the file load process.
 * @private
 */
lgb.view.RoofTopView.prototype.loadScene_ = function() {


  var path = lgb.Config.ASSETS_BASE_PATH + 'rooftop/scene-bin.js';

  /**@type {THREE.SceneLoaderEx} */
  this.loader_ = new THREE.SceneLoaderEx();

  this.loader_.load(path, this.d(this.onSceneLoaded_));
};




/**
 * @private
 * @param {*} result The result of the scene load.
 *       result = {.

        scene: new THREE.Scene(),
        geometries: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        triggers: {},
        empties: {}

      };
 */
lgb.view.RoofTopView.prototype.onSceneLoaded_ = function(result) {

  /**@type THREE.Scene */
  var scene = result['scene'];

  lgb.logInfo('onSceneLoaded_');
  this.masterGroup = new THREE.Object3D();

  for (var i = scene.objects.length - 1; i >= 0; i--) {
      var mesh = scene.objects[i];

      if (mesh.name == 'Ducting') {
        mesh.doubleSided = true;
      }
      
    mesh.castShadow = true;
    mesh.receiveShadow = true;
      
    mesh.dynamic = true;
    mesh.bakeTransformsIntoGeometry();
    mesh.extractPositionFromGeometry();
    this.masterGroup.add(mesh);

    var event = new lgb.events.SelectableLoaded(mesh);
    this.dispatchLocal(event);

  }



  this.masterGroup.position = scene.position;
  this.masterGroup.rotation = scene.rotation;
  this.masterGroup.scale = scene.scale;
  this.masterGroup.castShadow = true;
  this.masterGroup.receiveShadow = true;

  this.requestAddToWorld(this.masterGroup);
  //var event = new lgb.events.Object3DLoaded(this.masterGroup);
//  this.dispatchLocal(event);

  delete this.loader_;
};




/**
 * @override
 * @param {lgb.events.DataModelChanged} event The event
 * notifying us of a change.
 * @protected
 */
lgb.view.RoofTopView.prototype.onChange = function(event) {
  this.updateAllFromModel_();
};


/**
 * Updates the view here to reflect any changes in the MVC data model.
 * @private
 */
lgb.view.RoofTopView.prototype.updateAllFromModel_ = function() {
  this.updateVisible_();
};


/**
 * Updates this view to reflect the changes in the visibility
 * state of the MVC model.
 * @private
 */
lgb.view.RoofTopView.prototype.updateVisible_ = function() {
  var m = this.masterGroup.children.length;

  for (var i = 0; i < m; i++) {
    this.masterGroup.children[i].visible = this.dataModel.isVisible;
  }
};


