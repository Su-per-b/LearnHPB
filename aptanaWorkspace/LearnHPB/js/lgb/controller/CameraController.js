/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.CameraController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.view.CameraView');
goog.require('lgb.events.RequestGoToViewPoint');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.CameraController = function(domElement) {
  lgb.controller.BaseController.call(this);
  
  this.domElement_ = domElement;
  this.init_();
};
goog.inherits(lgb.controller.CameraController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.CameraController.prototype.init_ = function() {

  this.view = new lgb.view.CameraView(this.domElement_);
  this.view.init();
  this.bind_();
};

lgb.controller.CameraController.prototype.getCamera = function() {

  return this.view.camera;

};

/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 * @private
 */
lgb.controller.CameraController.prototype.bind_ = function() {

 // this.makeAddToWorldRequestGlobal();
  
  this.listen(
    lgb.events.RequestGoToViewPoint.TYPE,
    this.onRequestGoToViewPoint_
  );
  
};

/**
 * @private
 * @param {lgb.events.RequestGoToViewPoint} event Fired.
 */
lgb.controller.CameraController.prototype.onRequestGoToViewPoint_ =
  function(event) {
  
  this.view.goToViewPoint(event.payload);

};


