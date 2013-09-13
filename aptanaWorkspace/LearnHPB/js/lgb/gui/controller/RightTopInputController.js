/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.RightTopInputController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.gui.model.BaseInputModel');
goog.require('lgb.gui.view.RightTopInputGUI');

/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.gui.controller.RightTopInputController = function( ) {

  lgb.controller.BaseController.call(this);
  this.init_();
  
};
goog.inherits(lgb.gui.controller.RightTopInputController, lgb.controller.BaseController);


/**
 * Initialized the controller.
 */
lgb.gui.controller.RightTopInputController.prototype.init_ = function() {
  
  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.RightTopInputGUI (this.dataModel);

  this.bind_();
  this.guiView.init();
  
};


lgb.gui.controller.RightTopInputController.prototype.bind_ = function() {
  
  this.relay (
    this.guiView,
    e.RequestAddToLayout);

};


