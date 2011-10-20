goog.provide('lgb.controller.ScenarioController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.model.scenario.Base");



/**
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
lgb.controller.ScenarioController = function(){
	lgb.controller.ControllerBase.call(this);
	
	this.dataModel = new lgb.model.scenario.Base();	
	this.dataModel.load();
	
	//this.view =  new lgb.view.ScenarioView(this.dataModel);
//	this.listen(lgb.event.SelectableEvent.SELECT_ID, this.onSelectId);
	this.listen(lgb.event.ScenarioParsed, this.onScenarioParsed);
};

goog.inherits(lgb.controller.ScenarioController, lgb.controller.ControllerBase);


lgb.controller.ScenarioController.prototype.onScenarioParsed = function(event){
	
};















