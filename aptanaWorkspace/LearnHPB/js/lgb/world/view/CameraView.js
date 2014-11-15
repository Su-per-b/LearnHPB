/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.world.view.CameraView');

goog.require('lgb.world.controller.CameraCraneController');
goog.require('lgb.world.view.BaseWorldView');

/**
 * @constructor
 * @extends {BaseView3dScene}
 * @param {Node} domElement Needed to create the camera.
 */
lgb.world.view.CameraView = function(domElement) {


 lgb.world.view.BaseWorldView.call(this);

  this.domElement_ = domElement;

  this.offset_ = new THREE.Vector3(0, 2, 5);
};
goog.inherits(lgb.world.view.CameraView,lgb.world.view.BaseWorldView);

lgb.world.view.CameraView.prototype.init = function() {

  this.camera = new THREE.PerspectiveCamera(40, this.domElement_.width / this.domElement_.height, 1, 10000);

  this.orbitRadius = 69;
  
  this.camera.position.x = 0.6694;
  this.camera.position.y = 31.08;
  this.camera.position.z = 68.00;


  var lookat = new THREE.Vector3(0.9247, 5.451, 0);
  this.camera.lookAt(lookat);
  this.camera.name = 'ActiveCamera';

  this.bind_();
  
  this.cameraCraneController_ = new lgb.world.controller.CameraCraneController();
  this.cameraCraneController_.debugMode = false;
  this.cameraCraneController_.init(this.camera);
  
};


  lgb.world.view.CameraView.prototype.bind_ = function() {
  this.listen(e.LayoutChange, this.onLayoutChange_);
};


lgb.world.view.CameraView.prototype.goToViewpointNode = function(viewpointNode) {

  this.cameraCraneController_.moveToViewpoint(viewpointNode);
  
};

/**
 * @param {THREE.Camera} camera The viewpoint to go to.
 */
lgb.world.view.CameraView.prototype.goToViewpoint = function(node) {

  //var startPosition = this.camera.position.clone();
  var targetPosition = node.getTargetPosition();

  var targetBoundingBox = node.targetBoundingBox;

  var camera = new THREE.PerspectiveCamera(this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);

  var moveToPosition = targetPosition.clone();
  moveToPosition.add(this.offset_);

  camera.position = moveToPosition;
  camera.target = targetPosition;
  camera.lookAt(targetPosition);
  
  camera.lookAtPosition = targetPosition;
  
  this.cameraCraneController_.moveToPosition(camera);

};



lgb.world.view.CameraView.prototype.onLayoutChange_ = function(event) {
  
  
  this.camera.aspect = this.domElement_.width / this.domElement_.height;
  this.camera.updateProjectionMatrix();
  
};



