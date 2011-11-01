goog.provide('lgb.controller.RoofTopController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.RoofTopModel');
goog.require('lgb.view.RoofTopView');





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

	this.dataModel = new lgb.model.RoofTopModel();
	this.view = new lgb.view.RoofTopView(this.dataModel);
	this.listenTo(this.view, lgb.events.SelectableLoaded.TYPE, this.onSelectableLoaded)
	this.view.init();
	
	lgb.controller.RoofTopController.superClass_.bind.call(this);
	

};


/**
 * @public
 * @param {lgb.events.SelectableLoaded}
 */
lgb.controller.RoofTopController.prototype.onSelectableLoaded = function(event) {
	this.dispatch(event);
};


/**
 * @public
 * @param {lgb.model.Building.Group}
 */
lgb.controller.RoofTopController.prototype.setVisiblityGroup = function(group) {
	this.dataModel.setVisiblityGroup(group)
};

