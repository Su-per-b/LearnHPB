



var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building LeftNav
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.TitleBarController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		this.listen(lgb.event.Event.SHOW_GUI, this.onShowGUI);
		this.view = new lgb.view.TitleBarView();
		this.view.init();
	};
	
	
	lgb.controller.TitleBarController.prototype = {

		onShowGUI : function(event) {
			this.unlisten(lgb.event.Event.SHOW_GUI, this.onShowGUI);
			this.view.show();
		}

	
	};
	
	lgb.controller.TitleBarController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










