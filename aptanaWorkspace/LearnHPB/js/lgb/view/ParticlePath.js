/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.ParticlePath');

goog.require('lgb.view.BaseV');


/**
 * MVC View
 * @constructor
 * @extends lgb.view.BaseV
 * @param {THREE.SplineCurve3} curve The path for a particle to travel.
 * @param {number} frameCount The number of animation frames.
 */
lgb.view.ParticlePath = function(curve, frameCount) {
    

  lgb.view.BaseV.call(this);

  this.curve = curve;

  this.frameToPositionMap = [];
  this.vertices = [];
  this.currentFrameNumber = 0;
  this.visibleLine = null;
  this.frameCount = frameCount;
  this.calculateAnimationFrames();

};
goog.inherits(lgb.view.ParticlePath, lgb.view.BaseV);

/**
 * chop the path up into a series of pionts.
 */
lgb.view.ParticlePath.prototype.calculateAnimationFrames = function() {
  var i = this.frameCount;
  //quantize the curve based on the number of frames
  //in the entire animation
  while (i--) {
    var percentageComplete = (i) / this.frameCount;
    var pointAlongcurve = this.curve.getPointAt(percentageComplete);
    this.frameToPositionMap[i] = pointAlongcurve;
  }
};


/**
 * turn the path into a 3D line.
 * @return {THREE.Line} The 3D line.
 */
lgb.view.ParticlePath.prototype.makeVisibleLine = function() {
  var lineBasicMaterial = new THREE.LineBasicMaterial(
    { color: 0xff0000, opacity: 1, linewidth: 3 }
  );

  var vertices = [];
  var i = this.frameToPositionMap.length;

  while (i--) {
     var vector3 = this.frameToPositionMap[i];
   //  var vertex = new THREE.Vertex(vector3);
     vertices.push(vector3);
  }

  var geometry = new THREE.Geometry();
  geometry.vertices = vertices;

  this.visibleLine = new THREE.Line(geometry, lineBasicMaterial);

  return this.visibleLine;

};
