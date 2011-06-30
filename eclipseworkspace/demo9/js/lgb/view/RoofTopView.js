

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
		
		this.mesh = new lgb.view.Mesh('rooftop.json');
		
		
		this.dispatch(lgb.event.Event.MESH_REQUEST, [this.mesh]);
	}
	
	lgb.view.RoofTopView.prototype = {
	
		meshesLoaded : function() {
			//this.mesh = mainController.loader.modelList['rooftop'];
			this.mesh.showBoundingBox();
		},
		
		/*
		 * this view doesnt know about the envelope view,
		 * but we have to place it at the top of the envelope, so
		 * this paramter tell the view where to position the 
		 * HVAC mesh
		*	@param height in meters
		*/
		show : function() {
			//var heightInFt = this.dataModel.getBuildingHeight();
			this.mesh.resetPostion();

			this.mesh.rotateX( 270);
			this.mesh.moveToOrigin();
		//	
			//var m = height;
			
			this.mesh.translate(this.positionOffset[0], this.positionOffset[1], this.positionOffset[2]);
			//this.mesh.translate(0,yOffset,0);
			
		},
		


		getMeshList: function() {
			
			var modelAry = [
				{file: 'rooftop.json', mode: 'HVAC', name: 'rooftop'}
			];
			
			return modelAry;
		}
		
	};

	lgb.view.RoofTopView.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











