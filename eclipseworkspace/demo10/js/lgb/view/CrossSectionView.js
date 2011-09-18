

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view for displaying the building envelope
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.CrossSectionView = function(dataModel){
	
		lgb.view.ViewBase.call(this);
		this.dataModel = dataModel; //building
		this.positionOffset =[0,0,0];
		
		this.mesh = new lgb.kuda.Mesh('CrossSectionExteriorInsulation.json');
		
		
		this.dispatch(lgb.event.Event.MESH_REQUEST, [this.mesh]);
		
	}
	
	lgb.view.CrossSectionView.prototype = {
	
		meshesLoaded : function() {
			//this.mesh.showBoundingBox();
			
			var comp = new lgb.model.BuildingComponentModel(this.mesh.root);
			comp.addVisibilityTags(lgb.model.VisibilityTag.CROSS_SECTION);

			this.dispatch(lgb.event.Event.REGISTER_COMPONENT, comp);
		},
		
		/*
		 * this view doesn't know about the envelope view,
		 * but we have to place it at the top of the envelope, so
		 * this parameter tell the view where to position the 
		 * HVAC mesh
		*	@param height in meters
		*/
		show : function() {

			this.mesh.resetPosition();
			//this.mesh.rotateX( 270);
			this.mesh.moveToOrigin();
			
			this.mesh.translate(
				this.positionOffset[0], 
				this.positionOffset[1], 
				this.positionOffset[2]
			);
		
		}
		



		
	};

	lgb.view.CrossSectionView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











