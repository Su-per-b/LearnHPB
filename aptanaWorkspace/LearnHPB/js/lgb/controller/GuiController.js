/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.GuiController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.PropertiesController');
goog.require('lgb.controller.input.TestingInputController');
goog.require('lgb.controller.input.MainInputController');
goog.require('lgb.controller.input.RightTopInputController');
goog.require('lgb.controller.TopMenuController');
goog.require('lgb.controller.VisibilityController');
goog.require('lgb.controller.input.ViewPointController');


goog.require('lgb.view.TitleBarView');



/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.GuiController = function() {
  lgb.controller.BaseController.call(this);
  
  this.init_();
};
goog.inherits(lgb.controller.GuiController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.GuiController.prototype.init_ = function() {

  this.topMenuController = new lgb.controller.TopMenuController();

  this.propertiesController = new lgb.controller.PropertiesController();
  this.mainInputController_ = new lgb.controller.input.MainInputController();
  this.rightTopInputController_ = new lgb.controller.input.RightTopInputController();

  this.visibilityController_ = new lgb.controller.VisibilityController();
  this.viewpointController_ = new lgb.controller.input.ViewPointController();
 
  this.visibilityController_.init();
  this.viewpointController_.init();
  
  this.titleBarView = new lgb.view.TitleBarView();

  this.trigger(e.RequestAddToLayout, this.titleBarView);

};


