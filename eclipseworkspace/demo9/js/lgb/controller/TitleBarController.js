



var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building LeftNav
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.TitleBarController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		this.listen(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
		this.view = new lgb.view.TitleBarView();
		this.view.init();
	};
	
	
	lgb.controller.TitleBarController.prototype = {

		onCameraMoveComplete : function(event) {
			this.unlisten(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
			this.view.show();
		}

	
	};
	
	lgb.controller.TitleBarController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










