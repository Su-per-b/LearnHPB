goog.provide('lgb.controller.BuildingController');

goog.require('lgb.controller.ControllerBase');

goog.require('lgb.controller.EnvelopeController');
goog.require('lgb.controller.RoofTopController');
goog.require('lgb.controller.DuctworkController');
goog.require('lgb.events.NotifyVisibilityChanged');




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

	//this.dataModel = new lgb.model.BuildingModel();
	//this.view = new lgb.view.BuildingView(this.dataModel);
	
	this.envelopeController = new lgb.controller.EnvelopeController();
	this.roofTopController = new lgb.controller.RoofTopController();
	this.ductworkController = new lgb.controller.DuctworkController();
	
	this.bind_();
};


/**
 * @private
 */
lgb.controller.BuildingController.prototype.bind_ = function() {
	
	//lgb.controller.BuildingController.superClass_.bind.call(this);
	
	this.listen(lgb.events.RequestVisibilityChange.TYPE, 
		this.onRequestVisibilityChange_);
};


/**
 * Global event handler
 * @private
 */
lgb.controller.BuildingController.prototype.onRequestVisibilityChange_ = function(event) {

	var group = event.payload;
	
	this.envelopeController.setVisiblityGroup(group);
	this.roofTopController.setVisiblityGroup(group);
	this.ductworkController.setVisiblityGroup(group);
	
	this.dispatch(new lgb.events.NotifyVisibilityChanged(group));
}