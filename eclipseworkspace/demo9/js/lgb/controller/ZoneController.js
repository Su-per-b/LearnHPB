


/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.controller = lgb.controller || {};
	
	lgb.controller.ZoneController = function(){
		lgb.controller.ControllerBase.call(this);
		
		this.dataModel = new lgb.model.ZoneModel();
		this.view = new lgb.view.ZoneView(this.dataModel);

		this.listen(lgb.event.BuildingEvent.GEOMETRY_CHANGED, this);

	};
	
	lgb.controller.ZoneController.prototype = {
		
		
		onBuildingGeometryChanged : function (event) {
			
			var buildingView = event.value;
			buildingView.assertType(lgb.view.BuildingView);
			
			//var height = buildingView
			
			this.view.show(buildingView);
			
			//this.yPosition = buildingView.envelopeView.getMeshHeight();
			
			//this.init(buildingView.envelopeView.getOriginalMesh());
		},
		
		
		

		
		
		
	};
	
	lgb.controller.ZoneController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










