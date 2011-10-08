



var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building LeftNav
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.LeftNavController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		this.listen(lgb.event.Event.SHOW_GUI, this.onShowGUI);
			
		this.dataModel = new lgb.model.LeftNavModel();
		this.view = new lgb.view.LeftNavView(this.dataModel );
	};
	
	
	lgb.controller.LeftNavController.prototype = {
		

		onShowGUI : function(event) {
			this.unlisten(lgb.event.Event.SHOW_GUI, this.onShowGUI);
			
			this.view.bindEvents();
			this.view.show();
		}

	};
	
	lgb.controller.LeftNavController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










