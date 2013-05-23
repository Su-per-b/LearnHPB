/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.CameraCraneController');

goog.require('lgb.controller.BaseController');


/**
 * Moves the camera through the scene
 * depends on the TweenJs library by G.kinner.
 * I need to ride my Super Techno Crane!
 * http://www.youtube.com/watch?v=Rb6NqHHOR4M
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.CameraCraneController = function() {
  lgb.controller.BaseController.call(this);
  this.debugMode = false;
  
  this.moveDuration = 5 * 1000; // milliseconds
  this.lookAtDuration = 2 * 1000; // milliseconds
  this.fovDuration = 5 * 1000; // milliseconds
  
  this.metersPerSecondPostion = 6;
  this.metersPerSecondRotation = .1;
  this.degreesPerSecondFOV = 4;
  
  this.easing = createjs.Ease.quadInOut;
   
};
goog.inherits(lgb.controller.CameraCraneController, lgb.controller.BaseController);


/**
 * initializes the controller
 * @private
 */
lgb.controller.CameraCraneController.prototype.init =
  function(cameraOnCrane) {

  
  this.cameraOnCrane_ = cameraOnCrane;
  this.lookAtTarget = new THREE.Vector3(0,20,0);
  
  if (this.debugMode) {
    
    this.debugPath = this.makeLine(this.cameraOnCrane_, this.cameraDestination_);

    this.masterGroup_= new THREE.Object3D();
      
    var blueMaterial = new THREE.MeshLambertMaterial( { color: 0x0077ff } );
    var dummyGeo = new THREE.CubeGeometry( 2, 2, 4 );

    this.debugObject = new THREE.Mesh(dummyGeo, blueMaterial);
    this.masterGroup_.add(this.debugObject);
    this.masterGroup_.add(this.debugPath);
    
    var event = new lgb.events.Object3DLoaded(this.masterGroup_);
    this.dispatch(event);
  };

  this.onRenderKey = this.listen(lgb.events.Render.TYPE, this.onRender_);
    
};

lgb.controller.CameraCraneController.prototype.setDuration =
  function() {
    
  //  var xDelta = Math.abs(this.cameraDestination_.position.x -
  //   this.cameraOnCrane_.position.x);
    
    var positionDistance = this.cameraOnCrane_.
      position.distanceTo(this.cameraDestination_.position);
    
   // var rotationDistance = this.lookAtTarget.
    //  rotation.distanceTo(this.cameraDestination_.rotation);
    
    var durationPosition = positionDistance /this.metersPerSecondPostion;
  //  var durationRotation = rotationDistance /this.metersPerSecondRotation;
    
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

lgb.controller.CameraCraneController.prototype.moveToPosition =
  function(cameraDestination) {
    
  this.cameraDestination_ = cameraDestination;
  
  this.setDuration();
  
  var p = this.cameraDestination_.position;
  var r = this.cameraDestination_.rotation;
  var t = this.cameraDestination_.target;
  
  console.log("CameraCraneController.moveToPosition() " + 
  "x: " + p.x + 
  "y: " + p.y + 
  "z: " + p.z );
  
  
  
  this.listenForRender = true;
  
  var props = {
    override : true
  };
  
  var rotationTween = {
    x: r.x,
    y: r.y,
    z: r.z
  }
  
  new createjs.Tween(this.cameraOnCrane_.rotation, props).to( 
    rotationTween,
    this.moveDuration-100,
    this.easing 
    );
  
  if (undefined !== t) {
    
    var lookAtTween = {
      x: t.x,
      y: t.y,
      z: t.z
    }
    new createjs.Tween(this.lookAtTarget, props).to(
      lookAtTween,
      this.lookAtDuration,
      this.easing 
      );
  }

  
  var positionTween = {
    x: p.x,
    y: p.y,
    z: p.z
  }
  createjs.Tween.get(this.cameraOnCrane_.position, props)
    .to(
      positionTween,
      this.moveDuration +10,
      this.easing 
      )
    .call(this.d(this.onTweenComplete));
    
    
  var upTween = {
    x: this.cameraDestination_.up.x,
    y: this.cameraDestination_.up.y,
    z: this.cameraDestination_.up.z
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
lgb.controller.CameraCraneController.prototype.makeLine = function(startObject, endObject) {
  
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
lgb.controller.CameraCraneController.prototype.onRender_ = function(event) {
  
  if (this.listenForRender) {
    this.cameraOnCrane_.lookAt(this.lookAtTarget);
  }
}

/**
 * 
 */
lgb.controller.CameraCraneController.prototype.onTweenComplete = function(event) {
  
  this.cameraOnCrane_.lookAt(this.lookAtTarget);
  this.listenForRender = false;
}


