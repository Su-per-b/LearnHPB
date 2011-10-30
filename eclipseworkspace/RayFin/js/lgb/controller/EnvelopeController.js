goog.provide('lgb.controller.EnvelopeController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.view.EnvelopeView');

goog.require('lgb.events.DataModelCreated');
goog.require('lgb.events.RequestVisibilityChange');



/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.EnvelopeController = function() {

	lgb.controller.ControllerBase.call(this);
	this.init_();
};
goog.inherits(lgb.controller.EnvelopeController, lgb.controller.ControllerBase);


/**
 * @private
 */
lgb.controller.EnvelopeController.prototype.init_ = function() {

	this.dataModel = new lgb.model.EnvelopeModel();
	this.view = new lgb.view.EnvelopeView(this.dataModel);
	this.bind_();
	

};


/**
 * @private
 */
lgb.controller.EnvelopeController.prototype.bind_ = function() {
	
	lgb.controller.EnvelopeController.superClass_.bind.call(this);
	
};



/**
 * @public
 * @param {lgb.model.Building.Group}
 */
lgb.controller.EnvelopeController.prototype.setVisiblityGroup = function(group) {
	this.dataModel.setVisiblityGroup(group)
};




