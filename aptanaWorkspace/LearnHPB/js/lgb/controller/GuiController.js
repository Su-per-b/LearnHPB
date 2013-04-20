/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.GuiController');

goog.require('lgb.controller.AdminController');
goog.require('lgb.controller.ControllerBase');
goog.require('lgb.controller.LeftNavController');
goog.require('lgb.controller.PropertiesController');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.view.TitleBarView');
goog.require('lgb.events.WindowResize');
goog.require('lgb.events.LayoutChange');

/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.GuiController = function() {
  lgb.controller.ControllerBase.call(this);
  
  this.init_();
};
goog.inherits(lgb.controller.GuiController, lgb.controller.ControllerBase);


/**
 * @private
 */
lgb.controller.GuiController.prototype.init_ = function() {

  this.adminController = new lgb.controller.AdminController();
  this.leftNavController = new lgb.controller.LeftNavController();
  this.propertiesController = new lgb.controller.PropertiesController();
  
  this.titleBarView = new lgb.view.TitleBarView();
  this.titleBarView.show();

  this.bind_();
};

lgb.controller.GuiController.prototype.bind_ = function() {

  this.listen(lgb.events.WindowResize.TYPE, this.onWindowResize_);
  this.listen(lgb.events.LayoutChange.TYPE, this.onLayoutChange_);

};


lgb.controller.GuiController.prototype.onWindowResize_ = function(event) {

    this.titleBarView.tweenToPosition();
};


lgb.controller.GuiController.prototype.onLayoutChange_ = function(event) {

    this.titleBarView.tweenToPosition();

};

