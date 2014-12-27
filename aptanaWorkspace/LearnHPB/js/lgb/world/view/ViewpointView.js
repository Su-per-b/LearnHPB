/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.view.ViewpointView');

goog.require('lgb.world.view.BaseWorldView');
goog.require('lgb.world.model.BuildingHeightModel');
goog.require('lgb.world.model.vo.ViewpointNode');



/**
 * MVC View
 * @constructor
 * @extends lgb.world.view.BaseWorldView
 */
lgb.world.view.ViewpointView = function(dataModel) {
    

  this._ASSETS_FOLDER = 'viewpoints';
  this._TITLE = 'Custom Viewpoints';
  
  lgb.world.view.BaseWorldView.call(this, dataModel);

  
};
goog.inherits(lgb.world.view.ViewpointView,lgb.world.view.BaseWorldView);




/**
 * Event handler called when the the scene is loaded.
 * @param {Object} result From the THREE.js lib.
 * @private
 */
lgb.world.view.ViewpointView.prototype.onSceneLoadedBase_ = function(result) {

  this.scene_ = result.scene;
  this.groups_ = result.groups;
  this.cameras_ = result.cameras;
  this.appData_ = result.appData;
  this.containers_ = result.containers;
  this.geometries_ = result.geometries;
  this.objects_ = result.objects;
  this.meshes_ = {};
  this.object3ds_ = {};
  
  this.masterGroup_.position = this.scene_.position;
  this.masterGroup_.rotation = this.scene_.rotation;
  this.masterGroup_.scale = this.scene_.scale;
  this.masterGroup_.viewpoint = "defaultScene";
  
  this.objectTypeMap_ = {
    Mesh : this.meshes_,
    Object3D : this.object3ds_
  };
  
  if ( !COMPILED  && lgb.core.Config.DEBUG_3D) {
    this.eachProperty(this.geometries_, this.analyzeOneGeometry_);
  }
 
  this.eachPropertyName(this.objects_, this.processOneObject_);
  
  if (this.containers_ != null) {
    this.placeContainers_();
  }
  
  if (this.onSceneLoaded_ !== undefined) {
    this.onSceneLoaded_();
  }
  
  this.requestAddToWorld(this.masterGroup_);
  delete this.loader_;
  
  this.triggerLocal(e.ViewInitialized);

};


/**
 * Event handler called by the base class when the scene is loaded
 * @private
 */
lgb.world.view.ViewpointView.prototype.onSceneLoaded_ = function() {

  
  var camList = [];
  var nodeList = [];
  var nodeListCeiling = [];
  
  for (var camName in this.cameras_) {
    
    if (undefined !== camName) {
      
        var theCamera = this.cameras_[camName];
        
        theCamera.position.add(this.scene_.position);
        theCamera.target.add(this.scene_.position);
        
        theCamera.name = camName;
        camList.push(theCamera);
        
        var node = new lgb.world.model.vo.ViewpointNode.makeFromCamera(theCamera);
        nodeList.push(node);
    }
  }
    var viewpointNode = new lgb.world.model.vo.ViewpointNode.makeFromArray (this._TITLE, nodeList, 1 );
    this.triggerLocal(e.ViewpointNodesLoaded, viewpointNode);
  
    var defaultNode = nodeList[0];
    defaultNode.updateWorldPositions();
    this.triggerLocal(e.RequestGoToViewpointNode, defaultNode);
    
    
};












