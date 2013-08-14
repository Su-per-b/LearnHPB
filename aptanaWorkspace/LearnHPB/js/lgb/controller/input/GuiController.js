/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.input.GuiController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.PropertiesController');
goog.require('lgb.controller.input.TestingInputController');
goog.require('lgb.controller.input.MainInputController');
goog.require('lgb.controller.input.RightTopInputController');
goog.require('lgb.controller.input.TopMenuController');
goog.require('lgb.controller.VisibilityController');



goog.require('lgb.view.TitleBarView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.input.GuiController = function() {
  lgb.controller.BaseController.call(this);
  
  this.init_();
};
goog.inherits(lgb.controller.input.GuiController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.input.GuiController.prototype.init_ = function() {

  this.topMenuController = new lgb.controller.input.TopMenuController();

  this.propertiesController = new lgb.controller.PropertiesController();
  this.mainInputController_ = new lgb.controller.input.MainInputController();
  this.rightTopInputController_ = new lgb.controller.input.RightTopInputController();

  this.visibilityController_ = new lgb.controller.VisibilityController();
  this.visibilityController_.init();

  this.titleBarView = new lgb.view.TitleBarView();

  this.trigger(e.RequestAddToLayout, this.titleBarView);

};


