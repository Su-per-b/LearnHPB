/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.CameraCraneController');

goog.require('lgb.core.BaseController');


/**
 * Moves the camera through the scene
 * depends on the TweenJs library by G.kinner.
 * I need to ride my Super Techno Crane!
 * http://www.youtube.com/watch?v=Rb6NqHHOR4M
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.CameraCraneController = function() {
  lgb.core.BaseController.call(this);
  this.debugMode = false;
  
  this.moveDuration = 5 * 1000; // milliseconds
  this.lookAtDuration = 2 * 1000; // milliseconds
  this.fovDuration = 5 * 1000; // milliseconds
  
  this.metersPerSecondPostion = 6;
  this.metersPerSecondRotation = .1;
  this.degreesPerSecondFOV = 4;
  
  this.easing = createjs.Ease.quadInOut;
   
};
goog.inherits(lgb.world.controller.CameraCraneController, lgb.core.BaseController);


/**
 * initializes the controller
 * @private
 */
lgb.world.controller.CameraCraneController.prototype.init =
  function(cameraOnCrane) {

  
  this.cameraOnCrane_ = cameraOnCrane;
  this.lookAtPosition = cameraOnCrane.lookAtPosition;
  
  if (this.debugMode) {
    
    this.debugPath = this.makeLine(this.cameraOnCrane_, this.destinationCamera_);

    this.masterGroup_= new THREE.Object3D();
      
    var blueMaterial = new THREE.MeshLambertMaterial( { color: 0x0077ff } );
    var dummyGeo = new THREE.CubeGeometry( 2, 2, 4 );

    this.debugObject = new THREE.Mesh(dummyGeo, blueMaterial);
    this.masterGroup_.add(this.debugObject);
    this.masterGroup_.add(this.debugPath);
    
    this.trigger(e.AddToWorldRequest, this.masterGroup_);
  };

  this.onRenderKey = this.listen(e.RenderNotify, this.onRender_);
    
};

lgb.world.controller.CameraCraneController.prototype.setDuration =
  function() {
    
    var pos1 = this.cameraOnCrane_.position;
    var pos2 = this.destinationCamera_.position;
         
    var positionDistance = pos1.distanceTo(pos2);
    var durationPosition = positionDistance /this.metersPerSecondPostion;
    
    this.moveDuration = durationPosition * 1000;
    this.lookAtDuration = this.moveDuration * 0.6;
      
    if (this.moveDuration < 1000) {
      this.moveDuration = 1000;
      this.lookAtDuration = 1000;
    }
    
    if (this.moveDuration > 4500) {
      this.moveDuration = 4500;
      this.lookAtDuration = 3000;
    }

}

lgb.world.controller.CameraCraneController.prototype.moveToViewpoint =
  function(viewpointNode) {

  var destinationCamera = viewpointNode.generateCamera( this.cameraOnCrane_ );

  
  this.destinationCamera_ = destinationCamera;
  
  this.setDuration();
  this.listenForRender = true;
  

  var props = {
    override : true
  };
  
  //position tween
  
  var tweenPosition = createjs.Tween.get(this.cameraOnCrane_.position, props)
    .to(
      this.destinationCamera_.position,
      this.moveDuration,
      this.easing 
      )
    .call(this.d(this.onTweenComplete));
    
    
  //tween target
  if (undefined !== this.destinationCamera_.lookAtPosition) {
    
   // this.lookAtPosition = this.destinationCamera_.lookAtPosition;
    
    var tweenTarget = new createjs.Tween(this.lookAtPosition, props);
    
    tweenTarget.to (
      this.destinationCamera_.lookAtPosition,
      this.lookAtDuration,
      this.easing 
      );
  } else {
    debugger;
  }

  //camera up tween
  var upTween = {
    x: this.destinationCamera_.up.x,
    y: this.destinationCamera_.up.y,
    z: this.destinationCamera_.up.z
  }
  new createjs.Tween(this.cameraOnCrane_.up, props).to(
    upTween,
    this.lookAtDuration,
    this.easing 
    );
  
};



/**
 * 
 */
lgb.world.controller.CameraCraneController.prototype.makeLine = function(startObject, endObject) {
  
  var lineBasicMaterial = new THREE.LineBasicMaterial(
    { color: 0xff0000, opacity: 1, linewidth: 3 }
  );

  var vertices = [];

  var vector3Start = startObject.position.clone();
 // var vertexStart = new THREE.Vertex(vector3Start);
  vertices.push(vector3Start);
 
  var vector3End = endObject.position.clone();
 // var vertexEnd = new THREE.Vertex(vector3End);
  vertices.push(vector3End);
     
  var geometry = new THREE.Geometry();
  geometry.vertices = vertices;

  var visibleLine = new THREE.Line(geometry, lineBasicMaterial);

  return visibleLine;

};


/**
 * 
 */
lgb.world.controller.CameraCraneController.prototype.onRender_ = function(event) {
  
  if (this.listenForRender) {
    this.cameraOnCrane_.lookAt(this.lookAtPosition);
  }
}

/**
 * 
 */
lgb.world.controller.CameraCraneController.prototype.onTweenComplete = function(event) {
  
  this.cameraOnCrane_.lookAt(this.lookAtPosition);
  this.listenForRender = false;
}


