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
		this.listen(lgb.event.SelectableEvent.SELECT_ID, this.onSelectId);

	};
	
	lgb.controller.ScenarioController.prototype = {

/*
		onSelectId: function(event) {
			var id = event.value;
			
			var obj = this.dataModel.idxToNodeMap[id];
			
			this.dispatch(lgb.event.SelectableEvent.SELECT_OBJ, obj);
		}
*/
		
	};
	
	lgb.controller.ScenarioController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










