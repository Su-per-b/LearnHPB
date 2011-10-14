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
		this.listen(lgb.event.SelectableEvent.SELECTED_IN_WORLD, this.onSelectedInWorld);
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
		onSelectID : function(event) {
			//this.buttonView.setSelected(false);
			var id = event.value;
			this.view.showID(id);
			
			
		},
		onSelectedInWorld : function(event) {
			//this.buttonView.setSelected(false);
			var obj = event.value;
			this.view.showObj(obj);

		},
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










