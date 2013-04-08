/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.ViewPointModel');

goog.require('lgb.model.ModelBase');
goog.require('lgb.model.ViewPointNode');

/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.model.ViewPointModel = function() {
  /**@const */
  this._NAME = 'lgb.model.ViewPointModel';
  /**@const */
  this._TITLE = 'ViewPoints';
  lgb.model.ModelBase.call(this);
  this.init_();
  
  this.viewPointNodeList = [];
  this.viewPointNodeMap = {};
  
  this.cameras = [];
  this.camMap = {};
  
};
goog.inherits(lgb.model.ViewPointModel, lgb.model.ModelBase);


/**
 * @private
 */
lgb.model.ViewPointModel.prototype.init_ = function() {

};

/**
 * @param {string} name The camera name.
 */
lgb.model.ViewPointModel.prototype.getCameraByName = function(name) {

  return this.camMap[name];
  
};



lgb.model.ViewPointModel.prototype.addViewPoint = function(viewPointNode) {


    this.viewPointNodeList.push(viewPointNode);
    this.viewPointNodeMap[viewPointNode.name] = viewPointNode;
    
    /*
   var camera = new THREE.PerspectiveCamera(30, 1.333, 1, 1000);
   camera.name = object3D.name;
   
   var target =  object3D.position.clone();
   var position = target.clone();
   position.y += 2.0;
   position.z += 2.0;
   
    camera.target = target;
    camera.position = position;
    
    this.camMap[object3D.name] = camera;
    this.cameras.push(camera);
    
    */
   
};

lgb.model.ViewPointModel.prototype.addViewPointList = function(viewPointList) {


    var len = viewPointList.length;
    
      for (var i = 0; i < len; i++) {
        var node = viewPointList[i];
        this.addViewPoint(node);
      }
  
};



/**
 * @param {Array.<THREE.Camera>} cameras An array of camera objects.
 */
lgb.model.ViewPointModel.prototype.addCameras = function(cameras) {

  for (var camName in cameras) {
    
    if (undefined !== camName) {
      
        var theCamera = cameras[camName];
        theCamera.name = camName;
    
        this.camMap[camName] = theCamera;
        this.cameras.push(theCamera);

    }

  }

};
