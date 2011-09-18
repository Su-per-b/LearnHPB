

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view for displaying the building envelope
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.HVACview = function(dataModel){
	
		lgb.view.ViewBase.call(this);
		
		this.dataModel = dataModel; //building
		this.positionOffset =[];
		
		this.mesh = new lgb.kuda.Mesh('ductwork.json');
		
		this.dispatch(lgb.event.Event.MESH_REQUEST, [this.mesh]);
	}
	
	lgb.view.HVACview.prototype = {
	

		meshesLoaded : function() {
			
			var comp = new lgb.model.BuildingComponentModel(this.mesh.root);
			comp.addVisibilityTags(lgb.model.VisibilityTag.HVAC, lgb.model.VisibilityTag.DUCTWORK);

			this.dispatch(lgb.event.Event.REGISTER_COMPONENT, comp);
		},
		
		/*
		 * this view doesnt know about the envelope view,
		 * but we have to place it at the top of the envelope, so
		 * this paramter tell the view where to position the 
		 * HVAC mesh
		*	@param height in meters
		*/
		show : function() {
			this.mesh.resetPosition();
			this.mesh.moveToOrigin();

			this.mesh.translate(this.positionOffset[0], this.positionOffset[1], this.positionOffset[2]);
		}
		



		
	};

	lgb.view.HVACview.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











