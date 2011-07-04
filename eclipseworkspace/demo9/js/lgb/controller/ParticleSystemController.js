/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.controller = lgb.controller || {};
	
	lgb.controller.ParticleSystemController = function(isFast){
		lgb.controller.ControllerBase.call(this);
		
		
		if (isFast) {
			this.dataModel = new lgb.model.FastParticleSystemModel();
			this.view = new lgb.view.FastParticleSystemView(this.dataModel);
		} else {
			this.dataModel = new lgb.model.ParticleSystemModel();
			this.view = new lgb.view.ParticleSystemView(this.dataModel);
		}

		this.listen(lgb.event.Loader.ALL_MESHES_LOAD_START, this.onMeshesLoadStart);
		this.listen(lgb.event.ParticleSystemEvent.START, this.onStart);
		this.listen(lgb.event.ParticleSystemEvent.STOP, this.onStop);
		this.listen(lgb.event.ParticleSystemEvent.TOGGLE_BOXES, this.onToggleBoxes);
		
		this.listen(lgb.event.BuildingEvent.GEOMETRY_CHANGED, this.onBuildingGeometryChanged);

	};
	
	lgb.controller.ParticleSystemController.prototype = {


		onMeshesLoadStart : function (event) {
			this.dataModel.load();
		},
		onStart : function (event) {
			this.view.start();
		},
		onStop : function (event) {
			this.view.stop();
		},
		onToggleBoxes : function (event) {
			this.view.toggleBoxes();
		},
		
		onBuildingGeometryChanged : function (event) {
			
			var buildingView = event.value;
			buildingView.assertType(lgb.view.BuildingView);

			var verticalHeight = buildingView.envelopeView.getMeshHeight();		
			this.view.positionAll(verticalHeight);
			
		},

		
	};
	
	lgb.controller.ParticleSystemController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










