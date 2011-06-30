


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.CameraController = function() {
		
		lgb.controller.ControllerBase.call(this);

	};
	
	
	lgb.controller.CameraController.prototype = {
		
		init: function() {
			
			//this.dataModel = new lgb.model.CameraModel();
			//this.view = new lgb.view.CameraView(this.dataModel);
		}


	};
	
	lgb.controller.CameraController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










