/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.GuiController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.PropertiesController');
goog.require('lgb.gui.controller.LeftPanelGUIController');
goog.require('lgb.gui.controller.ButtonsTopRightHUDController');
goog.require('lgb.gui.controller.TopMenuController');
goog.require('lgb.world.controller.VisibilityController');
goog.require('lgb.gui.controller.BottomPanelGUIController');
goog.require('lgb.gui.view.TitleBarGUI');



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
  this.leftPanelGUIController_ = new lgb.gui.controller.LeftPanelGUIController();
  this.rightTopInputController_ = new lgb.gui.controller.ButtonsTopRightHUDController();

  this.visibilityController_ = new lgb.world.controller.VisibilityController();
  this.visibilityController_.init();

  //this.resultsController_ = new lgb.gui.controller.ResultsController();
  this.titleBarView = new lgb.gui.view.TitleBarGUI();
  this.bottomPanelGUIController_ = new lgb.gui.controller.BottomPanelGUIController();
  

  this.trigger(e.RequestAddToLayout, this.titleBarView);

};


