

var lgb = (function(lgb){

    lgb.controller = lgb.controller || {};
    
    
    /**
     * @class MVC controller for the Admin interface
     * @extends lgb.controller.ControllerBase
     */
    lgb.controller.ViewPointController = function(buildingController){
    
        lgb.controller.ControllerBase.call(this);
		
		this.buildingController = buildingController;
        this.init_();
    };
    
    
    lgb.controller.ViewPointController.prototype = {
    
        init_: function(){
        	
			this.dataModel = new lgb.model.ViewPointModel();
			this.view = new lgb.view.ViewPointView(this.dataModel);
			
			this.listen(lgb.event.BuildingEvent.GEOMETRY_CHANGED, this.onBuildingGeometryChanged);
			this.listen(lgb.event.Loader.ALL_MESHES_LOAD_COMPLETE, this.onMeshesLoaded);
			this.listen(lgb.event.Event.ZONES_REPOSITIONED, this.onZonesRepositioned);
			this.listen(lgb.event.ZoneEvent.GO_TO, this.onGoToZone);
			this.listen(lgb.event.ViewPointEvent.SHOW, this.onShowViewPoint);
			this.listen(lgb.event.ViewPointEvent.HIDE, this.onHideViewPoint);
			this.listen(lgb.event.ViewPointEvent.GO_TO, this.onGoToViewPoint);

        },
        
        onMeshesLoaded: function(event){
			this.show();
        },
        onGoToZone: function(event){
			
			var zoneNumber = event.value;
			this.dataModel.goToZone(zoneNumber);
        },
        onShowViewPoint: function(event){
			this.view.showEyeAndTarget(event.value);
        },
        onHideViewPoint: function(event){
			this.view.hideEyeAndTarget();
        },
        onGoToViewPoint: function(event){
			
			var viewPointName = event.value;
			this.dataModel.goTo(viewPointName);
        },
		
        onZonesRepositioned: function(event){
			
			var zoneArray = event.value;
		//	zoneArray.assertContainesType(lgb.view.ZoneShape)
			
			this.dataModel.processZones(zoneArray);
			
			///debugger;
			
        },
        
        onBuildingGeometryChanged: function(event){
			this.dataModel.init(this.buildingController.view);
			//this.dataModel.changeTarget();
        },
		
		show : function() {
			this.dataModel.init(this.buildingController.view);
			this.view.show();
		}

        

        
        
        
        
    };
    
    lgb.controller.ViewPointController.inheritsFrom(lgb.controller.ControllerBase);
    
    return lgb;
    
})(lgb || {});










