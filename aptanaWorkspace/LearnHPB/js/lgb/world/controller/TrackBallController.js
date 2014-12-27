/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.TrackBallController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.view.TrackBallView');

/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.TrackBallController = function( camera ) {

  lgb.core.BaseController.call(this);
  
  this.bind_();
  this.camera_= camera;
  
  this.view = new lgb.world.view.TrackBallView( camera);
  
};

goog.inherits(lgb.world.controller.TrackBallController, lgb.core.BaseController);

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.TrackBallController.prototype.bind_ = function() {


  this.listen(
    e.RequestGoToViewpointNode,
    this.onRequestGoToViewpointNode_
  );
  
};


lgb.world.controller.TrackBallController.prototype.onRequestGoToViewpointNode_ =
  function(event) {
  
  var camera = event.payload.generateCamera();
  
  this.view.setCameraTarget(camera.lookAtPosition);

};