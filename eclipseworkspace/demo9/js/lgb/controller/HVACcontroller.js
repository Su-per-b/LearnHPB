


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building envelope
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.HVACcontroller = function() {
		
		lgb.controller.ControllerBase.call(this);

		this.dataModel = new lgb.model.HVACmodel();
		this.view = new lgb.view.HVACview();

	};
	
	
	lgb.controller.HVACcontroller.prototype = {
		
		init: function() {
			

			//this.listen(lgb.event.EnvelopeEvent.CHANGE_FLOOR_HEIGHT, this.onChangeFloorHeight);


			this.view.init(this.dataModel);
		},
		
		getMeshList: function() {
			return this.view.getMeshList();
		}
	
	};
	
	lgb.controller.HVACcontroller.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










