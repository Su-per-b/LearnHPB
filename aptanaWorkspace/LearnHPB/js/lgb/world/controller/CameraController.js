/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.controller.CameraController');

goog.require('lgb.core.BaseController');
goog.require('lgb.world.view.CameraView');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.world.controller.CameraController = function(domElement) {
  lgb.core.BaseController.call(this);
  
  this.domElement_ = domElement;
  this.init_();
};
goog.inherits(lgb.world.controller.CameraController, lgb.core.BaseController);


/**
 * @private
 */
lgb.world.controller.CameraController.prototype.init_ = function() {

  this.view = new lgb.world.view.CameraView(this.domElement_);
  this.view.init();
  this.bind_();
};

lgb.world.controller.CameraController.prototype.getCamera = function() {

  return this.view.camera;

};

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.world.controller.CameraController.prototype.bind_ = function() {

  this.listen(
    e.RequestGoToViewpointNode,
    this.onRequestGoToViewpointNode_
  );
  
};



lgb.world.controller.CameraController.prototype.onRequestGoToViewpointNode_ =
  function(event) {
  
  this.view.goToViewpointNode(event.payload);

};


