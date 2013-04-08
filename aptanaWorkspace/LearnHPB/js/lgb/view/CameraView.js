/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.CameraView');

goog.require('lgb.controller.CameraCraneController');
goog.require('lgb.events.WindowResize');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {Node} domElement Needed to create the camera.
 */
lgb.view.CameraView = function(domElement) {
  lgb.view.ViewBase.call(this);
  this._NAME = 'lgb.view.CameraView';
  this.domElement_ = domElement;
  
  this.offset_ = new THREE.Vector3(0,2,5);
};
goog.inherits(lgb.view.CameraView, lgb.view.ViewBase);



lgb.view.CameraView.prototype.init = function() {


  this.camera = new THREE.PerspectiveCamera(
    40,
    this.domElement_.width / this.domElement_.height,
    1,
    10000
  );

 // this.camera.position.z = 500;
  this.orbitRadius = 65;
  this.camera.position.x = 0;
  this.camera.position.y = 0;
  this.camera.position.z = this.orbitRadius;

  this.camera.lookAt(new THREE.Vector3(0, 0, 0));


  this.camera.name = 'ActiveCamera';

  this.listen(lgb.events.WindowResize.TYPE, this.onWindowResize);
  //this.masterGroup_= new THREE.Object3D();
  //this.masterGroup_.name = this._NAME;

  //var event = new lgb.events.Object3DLoaded(this.masterGroup);
 // this.dispatchLocal(event);

  //var event2 = new lgb.events.Object3DLoaded(this.camera);
 // this.dispatchLocal(event2);


  this.cameraCraneController_ = new lgb.controller.CameraCraneController();
  this.cameraCraneController_.debugMode = false;
  this.cameraCraneController_.init(this.camera);
  

};

/**
 * @param {THREE.Camera} camera The viewpoint to go to.
 */
lgb.view.CameraView.prototype.goToViewPoint = function(node) {
    
    var startPosition = this.camera.position.clone();
    var targetPosition = node.getTargetPosition();

    var targetBoundingBox = node.targetBoundingBox;
    
    var camera = new THREE.PerspectiveCamera(
        this.camera.fov, this.camera .aspect, this.camera .near, this.camera .far);
        
        
   // var ray = new THREE.Ray(this.camera.position, targetPosition);
    
   // var intersect = ray.intersectObject(node.threeObject, true);
    
   // var intersect = THREE.Collisions.rayCastNearest(ray);
  
    //var intersects = ray.intersectScene(scene); 
    
    
   // camera.position.addSelf(scene.position);
   
    var moveToPosition = targetPosition.clone();
    moveToPosition.addSelf(this.offset_);
    
    camera.position = moveToPosition;
    camera.target = targetPosition;
    camera.lookAt(targetPosition);
    
    //  this.camera.lookAt(new THREE.Vector3(0, 0, 0));    
  // var camera = new 
  
  this.cameraCraneController_.moveToPosition(camera);

};





/**
 * Event handler for the browser window resize
 * @param {goog.events.Event} event The event.
 */
lgb.view.CameraView.prototype.onWindowResize = function(event) {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
};
