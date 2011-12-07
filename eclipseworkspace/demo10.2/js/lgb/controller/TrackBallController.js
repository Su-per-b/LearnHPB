goog.provide('lgb.controller.TrackBallController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.view.TrackBallView');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.TrackBallController = function(domElement, camera ) {
  lgb.controller.ControllerBase.call(this);
  
  this.domElement_= domElement;
  this.camera_= camera;
  
  this.view = new lgb.view.TrackBallView(domElement, camera);
  
};

goog.inherits(lgb.controller.TrackBallController, lgb.controller.ControllerBase);


