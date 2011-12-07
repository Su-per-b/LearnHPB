goog.provide('lgb.controller.GuiController');

goog.require('lgb.controller.AdminController');
goog.require('lgb.controller.ControllerBase');
goog.require('lgb.controller.LeftNavController');
goog.require('lgb.controller.PropertiesController');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.WindowResize');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.view.TitleBarView');


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

  this.titleBarView = new lgb.view.TitleBarView();
  this.titleBarView.show();

  this.propertiesController = new lgb.controller.PropertiesController();
};
