

var lgb = (function(lgb) {

	lgb.view = lgb.view || {};

	/**
	 * @class MVC view for displaying the building envelope
	 * @extends lgb.view.ViewBase
	 */
	lgb.view.RoofTopView = function(dataModel){
	
		lgb.view.ViewBase.call(this);
		this.dataModel = dataModel; //building
		this.positionOffset =[];
		
		
		this.mesh = new lgb.kuda.Mesh('rooftopLowpoly7_29_11_raj2.json');

		
		this.dispatch(lgb.event.Event.MESH_REQUEST, [this.mesh]);
		
	}
	
	lgb.view.RoofTopView.prototype = {
	
	
	
		//called automatically due to superclass	
		onChange : function(event) {
			this.show();
		},
		
		meshesLoaded : function() {
			var trans = this.mesh.getTransforms();
			
			var comp = new lgb.model.BuildingComponentModel(this.mesh.root);
			comp.addVisibilityTags(lgb.model.VisibilityTag.ROOFTOP, lgb.model.VisibilityTag.HVAC);

			this.mesh.makeSelectable("LeftDamper","Left Damper");
			this.mesh.makeSelectable("CenterDamper", "Center Damper");
			this.mesh.makeSelectable("CoolingCoil", "Cooling Coil", "CC");
			this.mesh.makeSelectable("Fan", "Fan", "FAN");
			this.mesh.makeSelectable("Filter", "Filter", "FLT");
			this.mesh.makeSelectable("HeatingCoil", "Heating Coil", "HC");
			this.mesh.makeSelectable("TopDamper", "Top Damper");
			
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
			this.mesh.moveToOrigin();
			
			this.mesh.translate(
				this.positionOffset[0], 
				this.positionOffset[1], 
				this.positionOffset[2]
			);
			
			this.mesh.rotateY(270);
			this.mesh.translate(1,0,0);
		}
		



		
	};

	lgb.view.RoofTopView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











