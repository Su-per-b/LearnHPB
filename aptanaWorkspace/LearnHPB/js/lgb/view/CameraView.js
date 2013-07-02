/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.CameraView');

goog.require('lgb.controller.CameraCraneController');
goog.require('lgb.view.BaseView3dScene');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {Node} domElement Needed to create the camera.
 */
lgb.view.CameraView = function(domElement) {


 lgb.view.BaseView3dScene.call(this);

  this.domElement_ = domElement;

  this.offset_ = new THREE.Vector3(0, 2, 5);
};
goog.inherits(lgb.view.CameraView,lgb.view.BaseView3dScene);

lgb.view.CameraView.prototype.init = function() {

  this.camera = new THREE.PerspectiveCamera(40, this.domElement_.width / this.domElement_.height, 1, 10000);

  // this.camera.position.z = 500;
  this.orbitRadius = 75;
  this.camera.position.x = 0;
  this.camera.position.y = 12;
  this.camera.position.z = this.orbitRadius;


  this.camera.lookAtTarget = new THREE.Vector3(0, 12, 0);
  
  this.camera.lookAt(this.camera.lookAtTarget);
  
  this.camera.name = 'ActiveCamera';

  this.bind_();
  
  this.cameraCraneController_ = new lgb.controller.CameraCraneController();
  this.cameraCraneController_.debugMode = false;
  this.cameraCraneController_.init(this.camera);
  
  this.cameraCraneController_.moveToPosition(this.camera);
};


lgb.view.CameraView.prototype.bind_ = function() {
  

  this.listen(e.LayoutChange, this.onLayoutChange_);
      
}


lgb.view.CameraView.prototype.goToViewPointNode = function(node) {

  //var startPosition = this.camera.position.clone();
  var lookAtPosition = node.getLookAtPosition();
  var lookAtPosition2 = lookAtPosition.clone();
    
  var moveToPosition = node.getCameraPosition();
  
  //var targetBoundingBox = node.targetBoundingBox;

  var camera = new THREE.PerspectiveCamera(this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);


  camera.position = moveToPosition.clone();
 // camera.target = targetPosition;
  camera.lookAt(lookAtPosition2);
  camera.lookAtPosition = lookAtPosition2;
  
  this.cameraCraneController_.moveToPosition(camera);

};

/**
 * @param {THREE.Camera} camera The viewpoint to go to.
 */
lgb.view.CameraView.prototype.goToViewPoint = function(node) {

  //var startPosition = this.camera.position.clone();
  var targetPosition = node.getTargetPosition();

  var targetBoundingBox = node.targetBoundingBox;

  var camera = new THREE.PerspectiveCamera(this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);

  var moveToPosition = targetPosition.clone();
  moveToPosition.addSelf(this.offset_);

  camera.position = moveToPosition;
  camera.target = targetPosition;
  camera.lookAt(targetPosition);
  
  camera.lookAtPosition = targetPosition;
  
  this.cameraCraneController_.moveToPosition(camera);

};



lgb.view.CameraView.prototype.onLayoutChange_ = function(event) {
  
  
  this.camera.aspect = this.domElement_.width / this.domElement_.height;
  this.camera.updateProjectionMatrix();
  
};



