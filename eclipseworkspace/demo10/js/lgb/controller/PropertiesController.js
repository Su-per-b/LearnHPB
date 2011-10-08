/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.controller = lgb.controller || {};
	
	lgb.controller.PropertiesController = function(isFast){
		lgb.controller.ControllerBase.call(this);
		
		//this.dataModel = new lgb.model.PropertiesModel();		
		
		this.buttonView =  new lgb.view.PropertiesButtonView();
		this.buttonView.init();
			
		this.listen(lgb.event.Event.SCENARIO_PARSED, this.onScenarioParsed);

	};
	
	lgb.controller.PropertiesController.prototype = {



		onScenarioParsed : function(event) {
			//this.view.init();
			this.view =  new lgb.view.PropertiesView(event.value);
			
			this.buttonView.show();
			this.view.show(true);
			
			this.listen(lgb.event.Event.TOGGLE_PROPERTIES_PANEL, this.onTogglePanel);
			this.listen(lgb.event.Event.CLOSED_PROPERTIES_PANEL, this.onClosedPanel);
		},
		

		//onShowGUI : function(event) {
			//this.unlisten(lgb.event.Event.SHOW_GUI, this.onShowGUI);

	//	},
		onClosedPanel : function(event) {
			this.buttonView.setSelected(false);
		},
		onTogglePanel : function(event) {
			
			this.view.toggleVisible();
			this.buttonView.toggleVisible();
		},
		
		


		
	};
	
	lgb.controller.PropertiesController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










