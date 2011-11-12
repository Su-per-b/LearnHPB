goog.provide('lgb.view.ParticlePath');

goog.require('hemi.curve');
goog.require('hemi.curve.Curve');
goog.require('lgb.view.ViewBase');


/**
 * MVC View
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {} curve
 * @param {number} frameCount The number of animation frames.
 */
lgb.view.ParticlePath = function(curve, frameCount) {
  lgb.view.ViewBase.call(this);

  this.curve = curve;
  this.frameToPositionMap = [];
  this.vertices = [];
  this.currentFrameNumber = 0;
  this.visibleLine = null;
  this.frameCount = frameCount;
  this.calculateAnimationFrames();

  this._NAME = 'lgb.view.ParticlePath';
};
goog.inherits(lgb.view.ParticlePath, lgb.view.ViewBase);




lgb.view.ParticlePath.prototype.addPoint = function(point) {
  this.frameToPositionMap.push(point);
};


lgb.view.ParticlePath.prototype.calculateAnimationFrames = function() {
  var i = this.frameCount;
  //quantize the curve based on the number of frames
  //in the entire animation
  while (i--) {
    var percentageComplete = (i) / this.frameCount;
    //var pointAlongCurve = this.curve.bezier(percentageComplete);
    //var pointAlongCurve = this.curve.linearNorm(percentageComplete);
    var pointAlongCurve = this.curve.cubicHermite(percentageComplete);

    this.frameToPositionMap[i] = pointAlongCurve;
  }
};


lgb.view.ParticlePath.prototype.makeVisibleLine = function() {
  var lineBasicMaterial = new THREE.LineBasicMaterial(
    { color: 0xff0000, opacity: 1, linewidth: 3 }
  );
  
  var vertices = [];
  var i = this.frameToPositionMap.length;
  
  while (i--) {
     var position = this.frameToPositionMap[i];
     var vector3 = new THREE.Vector3(position[0], position[1], position[2]);
     var vertex = new THREE.Vertex(vector3);
     vertices.push(vertex);
  }

  var geometry = new THREE.Geometry();
  geometry.vertices = vertices;
  
  this.visibleLine = new THREE.Line(geometry, lineBasicMaterial);
  
  return this.visibleLine;

};

/*

lgb.view.ParticlePath.prototype.goToFrame = function(frameNumber) {

  var pos = this.frameToPositionMap[frameNumber];
  this.vertices[0].position.x = pos[0];
  this.vertices[0].position.y = pos[1];
  this.vertices[0].position.z = pos[2];


};
*//*
lgb.view.ParticlePath.prototype.init = function() {

  this.framesBetweenLaunches = this.frameToPositionMap.length / this.vertices.length;

}


lgb.view.ParticlePath.prototype.nextFrame = function() {

  var pos = this.frameToPositionMap[this.currentFrameNumber];


  this.vertices[0].position.x = pos[0];
  this.vertices[0].position.y = pos[1];
  this.vertices[0].position.z = pos[2];

  this.currentFrameNumber++;
  if (this.currentFrameNumber > this.frameToPositionMap.length-1) {
    this.currentFrameNumber = 0;
  }

};


  */






