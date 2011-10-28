goog.provide('lgb.controller.BuildingController');

goog.require('lgb.controller.ControllerBase');

goog.require('lgb.model.RoofTopModel');
goog.require('lgb.view.RoofTopView');

goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.view.EnvelopeView');

goog.require('lgb.model.DuctworkModel');
goog.require('lgb.view.DuctworkView');


/**
 * MVC controller for the BuildingController
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.BuildingController = function() {

	lgb.controller.ControllerBase.call(this);
	this.init_();
};
goog.inherits(lgb.controller.BuildingController, lgb.controller.ControllerBase);

/**
 * initializes the controller
 * @private
 */
lgb.controller.BuildingController.prototype.init_ = function() {

	this.model = new lgb.model.EnvelopeModel();
	this.view = new lgb.view.EnvelopeView(this.model);
	
	this.model = new lgb.model.RoofTopModel();
	this.view = new lgb.view.RoofTopView(this.model);
	
	this.model = new lgb.model.DuctworkModel();
	this.view = new lgb.view.DuctworkView(this.model);
	
	
	
};
