goog.provide('lgb.model.ViewPointModel');

goog.require('lgb.model.ModelBase');



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

};
goog.inherits(lgb.model.ViewPointModel, lgb.model.ModelBase);


/**
 * @private
 */
lgb.model.ViewPointModel.prototype.init_ = function() {
  this.cameras = [];
  this.camMap = {};
};

/**
 * @param {string} name The camera name.
 */
lgb.model.ViewPointModel.prototype.getCameraByName = function(name) {

  return this.camMap[name];
  
};

/**
 * @param {Array.<THREE.Camera>} cameras An array of camera objects.
 */
lgb.model.ViewPointModel.prototype.addCameras = function(cameras) {

  for (var camName in cameras) {
    var theCamera = cameras[camName];
    theCamera.name = camName;

    this.camMap[camName] = theCamera;
    this.cameras.push(theCamera);

  }

};
