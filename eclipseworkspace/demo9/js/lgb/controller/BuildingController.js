


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building Building
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.BuildingController = function() {
		
		lgb.controller.ControllerBase.call(this);


	};
	
	
	lgb.controller.BuildingController.prototype = {
		
		init: function() {
			this.envelopeController = new lgb.controller.EnvelopeController();
			this.envelopeController.init();
			
			this.hvacController = new lgb.controller.HVACcontroller();
			this.hvacController.init();
			

			

		},
		getMeshList : function() {
			
				var list = [];
				list = list.concat(
					this.envelopeController.getMeshList(),
					this.hvacController.getMeshList()
				);
			
			return list;
		}


	};
	
	lgb.controller.BuildingController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










