

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
        },
        
        onMeshesLoaded: function(event){
			
			this.show();
        },
        
        onBuildingGeometryChanged: function(event){
			this.dataModel.init(this.buildingController.view);
			this.dataModel.changeTarget();
        },
		
		show : function() {
			this.dataModel.init(this.buildingController.view);
			this.view.show();
		}

        

        
        
        
        
    };
    
    lgb.controller.ViewPointController.inheritsFrom(lgb.controller.ControllerBase);
    
    return lgb;
    
})(lgb || {});










