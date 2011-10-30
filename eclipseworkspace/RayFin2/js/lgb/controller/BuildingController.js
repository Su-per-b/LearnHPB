goog.provide('lgb.controller.BuildingController');

goog.require('lgb.controller.ControllerBase');

goog.require('lgb.controller.EnvelopeController');
goog.require('lgb.controller.RoofTopController');
goog.require('lgb.controller.DuctworkController');

goog.require('lgb.model.BuildingModel');




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

	this.envelopeController = new lgb.controller.EnvelopeController();
	this.roofTopController = new lgb.controller.RoofTopController();
	this.ductworkController = new lgb.controller.DuctworkController();
	
	this.bind();
};


/**
 * @private
 */
lgb.controller.BuildingController.prototype.bind = function() {
	
	this.listen(lgb.events.RequestVisibilityChange.TYPE, 
		this.onRequestVisibilityChange_);
}


/**
 * @private
 */
lgb.controller.BuildingController.prototype.onRequestVisibilityChange_ = function(event) {
	//this.dispatch(event);
	
	//switch (event.payload) {
		//case lgb.model.BuildingModel.Group.HVAC : 
		//this.envelopeView.setVisible(false);
		//break;
	//}
}
