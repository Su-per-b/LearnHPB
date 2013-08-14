/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.TrackBallController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.TrackBallView');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.TrackBallController = function( camera ) {

  lgb.controller.BaseController.call(this);
  
  this.bind_();
  this.camera_= camera;
  
  this.view = new lgb.view.TrackBallView( camera);
  
};

goog.inherits(lgb.controller.TrackBallController, lgb.controller.BaseController);

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.TrackBallController.prototype.bind_ = function() {


  this.listen(
    e.RequestGoToViewPointNode,
    this.onRequestGoToViewPointNode_
  );
  
};


lgb.controller.TrackBallController.prototype.onRequestGoToViewPointNode_ =
  function(event) {
  
  var camera = event.payload.generateCamera();
  
  this.view.setCameraTarget(camera.lookAtPosition);

};