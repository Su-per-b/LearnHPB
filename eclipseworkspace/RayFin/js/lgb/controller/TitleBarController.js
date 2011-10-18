
goog.provide('lgb.controller.TitleBarController');

goog.require ("lgb.controller.ControllerBase");
goog.require ("lgb.view.TitleBarView");
goog.require ("lgb.event.ShowGUI");


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building LeftNav
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.TitleBarController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		this.listen(lgb.event.ShowGUI, this.onShowGUI);
		

		this.view = new lgb.view.TitleBarView();
		this.view.init();
	};
	

	goog.inherits(lgb.controller.TitleBarController, lgb.controller.ControllerBase);

	lgb.controller.TitleBarController.prototype.onShowGUI = function(event) {
		this.unlisten(lgb.event.SHOW_GUI, this.onShowGUI);
		this.view.show();
		
	};
	

	return lgb;
	
})(lgb || {});










