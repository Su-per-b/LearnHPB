/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.HvacInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.input.BaseInputModel');
goog.require('lgb.view.input.HvacInputGUI');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.HvacInputController = function( ) {

  lgb.controller.BaseController.call(this);
  
};
goog.inherits(lgb.controller.input.HvacInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.HvacInputController.prototype.init = function() {
  
  this.dataModel = new lgb.model.input.BaseInputModel();
  this.guiView = new lgb.view.input.HvacInputGUI (this.dataModel);

  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.HvacInputController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
    
};

