


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
			
			//this.envelopeController = new lgb.controller.EnvelopeController();
		//	this.hvacController = new lgb.controller.HVACcontroller();
			
			
			this.listen(lgb.event.Loader.ALL_MESHES_LOADED, this.onMeshesLoaded);
			this.listen(lgb.event.BuildingEvent.CHANGE_FLOOR_HEIGHT, this.onChangeFloorHeight);
			this.listen(lgb.event.BuildingEvent.CHANGE_NUMBER_OF_FLOORS, this.onChangeNumberOfFloors);
		},
		
		onMeshesLoaded : function(event) {
			
			this.view.meshesLoaded();
			
			//this.viewEnvelope.init2();
			//this.viewHVAC.init2();
			
			//this.envelopeController.init();
			//this.hvacController.init();
			
			
		//	this.dispatch(lgb.event.BuildingEvent.DATA_MODEL_CHANGED);
			
			
		},	
		
		onChangeNumberOfFloors: function(event) {
			var totalFloors = parseInt(event.value, 10);
			this.dataModel.setTotalFloors(totalFloors);
		},
		onChangeFloorHeight: function(event) {
			var height = parseInt(event.value, 10);
			this.dataModel.setFloorHeight(height);
		},
		
		getMeshList : function() {
			return this.view.getMeshList();
		}


	};
	
	lgb.controller.BuildingController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










