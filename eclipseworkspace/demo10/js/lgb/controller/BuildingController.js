


var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building Building
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.BuildingController = function() {
		
		lgb.controller.ControllerBase.call(this);
		this.init_();

	};
	
	
	lgb.controller.BuildingController.prototype = {
		
		init_: function() {
			
			this.dataModel = new lgb.model.BuildingModel();
			this.view = new lgb.view.BuildingView(this.dataModel);
			

			this.listen(lgb.event.BuildingEvent.CHANGE_FLOOR_HEIGHT, this.onChangeFloorHeight);
			this.listen(lgb.event.BuildingEvent.CHANGE_NUMBER_OF_FLOORS, this.onChangeNumberOfFloors);
		},
		
		onMeshesLoaded : function(event) {
			
			this.view.meshesLoaded();
			
			
		},	
		
		onChangeNumberOfFloors: function(event) {
			var totalFloors = parseInt(event.value, 10);
			this.dataModel.setTotalFloors(totalFloors);
		},
		onChangeFloorHeight: function(event) {
			var height = parseInt(event.value, 10);
			this.dataModel.setFloorHeight(height);
		}

	};
	
	lgb.controller.BuildingController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










