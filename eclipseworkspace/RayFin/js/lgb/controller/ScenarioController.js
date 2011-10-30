goog.provide('lgb.controller.ScenarioController');

goog.require('lgb.controller.ControllerBase');
goog.require('lgb.model.scenario.Base');

goog.require('lgb.events.DataModelInitialized');
goog.require('lgb.events.ScenarioParsed');


/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ScenarioController = function() {
	lgb.controller.ControllerBase.call(this);

	this.dataModel = new lgb.model.scenario.Base();

	this.listenTo(this.dataModel,
		 lgb.events.DataModelInitialized.TYPE,
		  this.onDataModelInitialized);
		  
	this.dataModel.load();
};
goog.inherits(lgb.controller.ScenarioController, lgb.controller.ControllerBase);


lgb.controller.ScenarioController.prototype.onDataModelInitialized = function(event) {
	
	var e = new lgb.events.ScenarioParsed(this.dataModel);
	this.dispatch(e);
};














