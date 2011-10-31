goog.provide('lgb.controller.EnvelopeController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.EnvelopeModel');
goog.require('lgb.model.BuildingModel.Group');
goog.require('lgb.view.EnvelopeView');
goog.require('lgb.view.EnvelopeAdminView');

goog.require('lgb.events.DataModelCreated');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.ViewInitialized');



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
	
	this.listenTo(this.view, 
		lgb.events.ViewInitialized.TYPE,
		this.onViewInitialized_);
	
};



/**
 * Event handler.
 * @private
 * @param {goog.events.Event} event
 */
lgb.controller.EnvelopeController.prototype.onViewInitialized_ = function(event) {
	
	this.adminView = new lgb.view.EnvelopeAdminView(this.dataModel, 'adminView');
	
	this.listenTo(this.adminView,
		lgb.events.RequestDataModelChange.TYPE,
		this.onRequestDataModelChange_);
		
	
};



/**
 * @private
 * @param {lgb.events.RequestDataModelChange} event The event.
 */
lgb.controller.EnvelopeController.prototype.onRequestDataModelChange_ = function(event) {
	this.dataModel.change(event.payload)
};




/**
 * @public
 * @param {lgb.model.Building.Group} group The group.
 */
lgb.controller.EnvelopeController.prototype.setVisiblityGroup = function(group) {
	this.dataModel.setVisiblityGroup(group)
};




