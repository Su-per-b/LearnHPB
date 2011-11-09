


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


		this.listen(lgb.event.BuildingEvent.GEOMETRY_CHANGED, this.onBuildingGeometryChanged);
		this.listen(lgb.event.ZoneEvent.SHOW, this.onZoneShow);
		this.listen(lgb.event.ZoneEvent.HIDE, this.onZoneHide);
		this.listen(lgb.event.ZoneEvent.GO_TO, this.onZoneGoTo);

	};
	
	lgb.controller.ZoneController.prototype = {


		onBuildingGeometryChanged : function (event) {
			
			var buildingView = event.value;
			buildingView.assertType(lgb.view.BuildingView);
			
			this.view.positionAllZones(buildingView);
			
		},

		onZoneShow: function(event){
			var zoneNumber = event.value;
			this.view.showZone(zoneNumber);
			
		},
		onZoneHide: function(event){
			var zoneNumber = event.value;
			this.view.hideZone(zoneNumber);
		},
		onZoneGoTo: function(event){
			var zoneNumber = event.value;
		}

	};
	
	lgb.controller.ZoneController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










