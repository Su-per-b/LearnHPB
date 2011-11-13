goog.provide('lgb.view.ParticlePath');

goog.require('hemi.curve');
goog.require('hemi.curve.Curve');
goog.require('lgb.view.ViewBase');


/**
 * MVC View
 * @constructor
 * @extends lgb.view.ViewBase
 * @param {hemi.curve.Curve} curve The path for a particle to travel.
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

/**
 * chop the path up into a series of pionts.
 */
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
