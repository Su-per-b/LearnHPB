goog.provide('lgb.controller.RoofTopController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.model.RoofTopModel");
goog.require ("lgb.view.RoofTopView");





/**
 * MVC controller for the RoofTopController
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.RoofTopController = function() {
	
	lgb.controller.ControllerBase.call(this);
	this.init();
};


goog.inherits(lgb.controller.RoofTopController, lgb.controller.ControllerBase);


lgb.controller.RoofTopController.prototype.init = function() {
	
	this.model = new lgb.model.RoofTopModel();
	this.view = new lgb.view.RoofTopView(this.model);
	
};