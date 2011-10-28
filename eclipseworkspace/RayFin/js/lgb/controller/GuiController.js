goog.provide('lgb.controller.GuiController');

goog.require('lgb.Config');
goog.require('lgb.controller.ControllerBase');
goog.require('lgb.controller.PropertiesController');
goog.require('lgb.controller.AdminController');
goog.require('lgb.events.WindowResizeEvent');
goog.require('lgb.events.WorldCreated');
goog.require('lgb.view.LeftNavView');
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
	
	this.titleBarView = new lgb.view.TitleBarView();
	this.titleBarView.show();

	this.leftNavView = new lgb.view.LeftNavView();
	this.leftNavView.show();

	this.propertiesController = new lgb.controller.PropertiesController();

};












