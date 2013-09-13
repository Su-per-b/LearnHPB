/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.GuiController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.PropertiesController');
goog.require('lgb.gui.controller.TestingInputController');
goog.require('lgb.gui.controller.MainController');
goog.require('lgb.gui.controller.RightTopInputController');
goog.require('lgb.gui.controller.TopMenuController');
goog.require('lgb.world.controller.VisibilityController');
goog.require('lgb.gui.controller.ResultsController');



goog.require('lgb.gui.view.TitleBarView');



/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.GuiController = function() {
  lgb.core.BaseController.call(this);
  
  this.init_();
};
goog.inherits(lgb.gui.controller.GuiController, lgb.core.BaseController);


/**
 * @private
 */
lgb.gui.controller.GuiController.prototype.init_ = function() {

  this.topMenuController = new lgb.gui.controller.TopMenuController();

  this.propertiesController = new lgb.gui.controller.PropertiesController();
  this.mainInputController_ = new lgb.gui.controller.MainController();
  this.rightTopInputController_ = new lgb.gui.controller.RightTopInputController();

  this.visibilityController_ = new lgb.world.controller.VisibilityController();
  this.visibilityController_.init();

  this.resultsController_ = new lgb.gui.controller.ResultsController();


  this.titleBarView = new lgb.gui.view.TitleBarView();

  this.trigger(e.RequestAddToLayout, this.titleBarView);

};


