



var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building LeftNav
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.LeftNavController = function() {
		
		lgb.controller.ControllerBase.call(this);
		
		this.listen(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
			
		this.dataModel = new lgb.model.LeftNavModel();
		this.view = new lgb.view.LeftNavView(this.dataModel );
	};
	
	
	lgb.controller.LeftNavController.prototype = {
		

		onCameraMoveComplete : function(event) {
			this.unlisten(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
			
			this.view.bindEvents();
			this.view.show();
		}

	};
	
	lgb.controller.LeftNavController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










