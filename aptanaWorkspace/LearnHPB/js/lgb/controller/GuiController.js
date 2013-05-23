/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.GuiController');

goog.require('lgb.controller.AdminController');
goog.require('lgb.controller.BaseController');
goog.require('lgb.controller.LeftNavController');
goog.require('lgb.controller.PropertiesController');
goog.require('lgb.controller.InputController');

goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.view.TitleBarView');
goog.require('lgb.events.LayoutChange');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.GuiController = function() {
  this._NAME = 'lgb.controller.GuiController';
  lgb.controller.BaseController.call(this);
  
  this.init_();
};
goog.inherits(lgb.controller.GuiController, lgb.controller.BaseController);


/**
 * @private
 */
lgb.controller.GuiController.prototype.init_ = function() {

  this.adminController = new lgb.controller.AdminController();
 // this.leftNavController = new lgb.controller.LeftNavController();
  this.propertiesController = new lgb.controller.PropertiesController();
  
  
  this.inputController_ = new lgb.controller.InputController();
  
  
  
  this.titleBarView = new lgb.view.TitleBarView();
  this.titleBarView.show();

  this.bind_();
};

lgb.controller.GuiController.prototype.bind_ = function() {

  this.listen(lgb.events.LayoutChange.TYPE, this.onLayoutChange_);

};


lgb.controller.GuiController.prototype.onLayoutChange_ = function(event) {

    this.titleBarView.tweenToPosition();

};

