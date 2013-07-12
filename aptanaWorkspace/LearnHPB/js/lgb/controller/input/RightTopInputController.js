/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.RightTopInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.BaseInputModel');
goog.require('lgb.view.input.RightTopInputGUI');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.RightTopInputController = function( ) {

  lgb.controller.BaseController.call(this);
  
};
goog.inherits(lgb.controller.input.RightTopInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.RightTopInputController.prototype.init = function() {
  
  this.dataModel = new lgb.model.BaseInputModel();
  this.guiView = new lgb.view.input.RightTopInputGUI (this.dataModel);

  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.RightTopInputController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToLayout);

};


