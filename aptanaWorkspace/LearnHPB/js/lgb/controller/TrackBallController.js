/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.TrackBallController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.view.TrackBallView');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.TrackBallController = function(domElement, camera ) {
  lgb.controller.ControllerBase.call(this);
  
  this.bind_();
  this.domElement_= domElement;
  this.camera_= camera;
  
  this.view = new lgb.view.TrackBallView(domElement, camera);
  
};

goog.inherits(lgb.controller.TrackBallController, lgb.controller.ControllerBase);

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.TrackBallController.prototype.bind_ = function() {

  this.listen(
    lgb.events.RequestGoToViewPoint.TYPE,
    this.onRequestGoToViewPoint_
  );
  
};

/**
 * @private
 * @param {lgb.events.RequestGoToViewPoint} event Fired.
 */
lgb.controller.TrackBallController.prototype.onRequestGoToViewPoint_ =
  function(event) {
  
  this.view.setCameraTarget(event.payload.getTargetPosition());

};