goog.provide('lgb.controller.GuiController');

goog.require ("lgb.controller.ControllerBase");


goog.require('lgb.event.WindowResizeEvent');
goog.require('lgb.event.WorldCreated');
goog.require('lgb.controller.TitleBarController');
goog.require('lgb.Config');
goog.require ("lgb.view.TitleBarView");
goog.require ("lgb.view.LeftNavView");
goog.require ("lgb.controller.PropertiesController");

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.GuiController = function() {
	
	lgb.controller.ControllerBase.call(this);
	var that = this;
	init_();
	
	function init_() {
		that.titleBarView = new lgb.view.TitleBarView();
		that.titleBarView.show();
		
		that.leftNavView = new lgb.view.LeftNavView();
		that.leftNavView.show();
		
		that.propertiesController = new lgb.controller.PropertiesController();	
	}

};


goog.inherits(lgb.controller.GuiController, lgb.controller.ControllerBase);




		




