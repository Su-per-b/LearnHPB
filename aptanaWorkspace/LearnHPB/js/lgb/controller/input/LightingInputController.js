/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.LightingInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.BaseInputModel');
goog.require('lgb.view.input.BuildingGeneralInputGUI');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.LightingInputController = function( ) {

  lgb.controller.BaseController.call(this);
  
};
goog.inherits(lgb.controller.input.LightingInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.controller.input.LightingInputController.prototype.init = function() {
  
  this.dataModel = new lgb.model.BaseInputModel();
  this.guiView = new lgb.view.input.BuildingGeneralInputGUI (this.dataModel);

  this.bind_();
  this.guiView.init();
  
};


lgb.controller.input.LightingInputController.prototype.bind_ = function() {
  
  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);

};


