

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view 
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.ScenarioView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);
	
	};
	
	lgb.view.ScenarioView.prototype = {
	

		onChange : function(event) {

		}
		
	};

	lgb.view.ScenarioView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











