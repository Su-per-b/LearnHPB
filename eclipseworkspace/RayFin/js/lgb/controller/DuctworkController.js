goog.provide('lgb.controller.DuctworkController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.DuctworkModel');
goog.require('lgb.view.DuctworkView');
goog.require('lgb.events.RequestVisibilityChange');
goog.require('lgb.events.SelectableLoaded');


/**
 * MVC controller for the Ductwork
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.DuctworkController = function() {

	lgb.controller.ControllerBase.call(this);
	this.init_();
};
goog.inherits(lgb.controller.DuctworkController, lgb.controller.ControllerBase);

/**
 * initializes the controller
 * @private
 */
lgb.controller.DuctworkController.prototype.init_ = function() {
	this.dataModel = new lgb.model.DuctworkModel();
	this.view = new lgb.view.DuctworkView(this.dataModel);
	this.bind_();
	this.view.init();
};




/**
 * @private
 */
lgb.controller.DuctworkController.prototype.bind_ = function() {
	lgb.controller.DuctworkController.superClass_.bind.call(this);
	
	this.listenTo(this.view, lgb.events.SelectableLoaded.TYPE, this.onSelectableLoaded)
};


/**
 * @public
 * @param {lgb.events.SelectableLoaded} event the event telling
 * about a new 3d Object which has loaded.
 */
lgb.controller.DuctworkController.prototype.onSelectableLoaded = function(event) {
	this.dispatch(event);
};

/**
 * @public
 * @param {lgb.model.BuildingModel.Group} group The group
 * to make visible.
 */
lgb.controller.DuctworkController.prototype.setVisiblityGroup = function(group) {
	this.dataModel.setVisiblityGroup(group)
};



