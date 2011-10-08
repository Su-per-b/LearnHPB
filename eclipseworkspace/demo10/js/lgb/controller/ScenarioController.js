/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.controller = lgb.controller || {};
	
	lgb.controller.ScenarioController = function(){
		lgb.controller.ControllerBase.call(this);
		
		this.dataModel = new lgb.model.scenario.Base();	
		this.dataModel.load();
		
		//this.view =  new lgb.view.ScenarioView(this.dataModel);
		

	};
	
	lgb.controller.ScenarioController.prototype = {




		


		
	};
	
	lgb.controller.ScenarioController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










