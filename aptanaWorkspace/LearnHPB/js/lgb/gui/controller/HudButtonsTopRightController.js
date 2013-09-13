/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.ButtonsTopRightHUDController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.model.BaseInputModel');
goog.require('lgb.gui.view.ButtonsTopRightHUD');

/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.ButtonsTopRightHUDController = function( ) {

  lgb.core.BaseController.call(this);
  this.init_();
  
};
goog.inherits(lgb.gui.controller.ButtonsTopRightHUDController, lgb.core.BaseController);


/**
 * Initialized the controller.
 */
lgb.gui.controller.ButtonsTopRightHUDController.prototype.init_ = function() {
  
  this.dataModel = new lgb.gui.model.BaseInputModel();
  this.guiView = new lgb.gui.view.ButtonsTopRightHUD (this.dataModel);

  this.bind_();
  this.guiView.init();
  
};


lgb.gui.controller.ButtonsTopRightHUDController.prototype.bind_ = function() {
  
  this.relay (
    this.guiView,
    e.RequestAddToLayout);

};


