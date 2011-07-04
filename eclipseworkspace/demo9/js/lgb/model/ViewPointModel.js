/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.ViewPointModel = function() {
		
		lgb.model.ModelBase.call(this);
		
		this.title = "View Points";
		this.name = "VIEWPOINTS";
		this.currentViewIdx = 'default';
		
	};/*

*/


	lgb.model.ViewPointModel.prototype = {
		
		
		//this dataModel is based on the BuildingView
		init: function(buildingView) {
			
			this.buildingView = buildingView;
			
			this.buildingFt = {
				longSide: 125,
				shortSide: 80,
				cornerWidth: 15,
				cornerHeight: 15
			};
			
			this.buildingFt.coreLongSide = this.buildingFt.longSide - (this.buildingFt.cornerWidth *2);
			this.buildingFt.coreShortSide = this.buildingFt.shortSide - (this.buildingFt.cornerHeight *2);

			var pxPerFoot = buildingView.spanX /this.buildingFt.longSide;
			
			this.buildingMeters = {};
			this.buildingMeters.longSide = buildingView.spanX;
			this.buildingMeters.shortSide = buildingView.spanY;
			this.buildingMeters.cornerWidth = this.buildingFt.cornerWidth * pxPerFoot;
			this.buildingMeters.cornerHeight = this.buildingFt.cornerHeight * pxPerFoot;
			this.buildingMeters.coreLongSide = this.buildingFt.coreLongSide * pxPerFoot;
			this.buildingMeters.coreShortSide = this.buildingFt.coreShortSide * pxPerFoot;

			this.viewPoints = [];
			
			var x = this.spanX - (this.buildingMeters.cornerWidth/2);
			var y = this.buildingMeters.cornerHeight/2;
			
			this.makeViewPoint(x,y,'zone1');
							
			x = (this.buildingMeters.cornerWidth/2);
			this.makeViewPoint(x,y,2);
			
			y = this.spanY - this.buildingMeters.cornerHeight/2;
			this.makeViewPoint(x,y,8);

			x = this.spanX - (this.buildingMeters.cornerWidth/2);
			this.makeViewPoint(x,y,6);
			
			x =  this.buildingMeters.cornerWidth + (this.buildingMeters.coreLongSide /2);
			y = this.buildingMeters.cornerHeight/2;
			this.makeViewPoint(x,y,1);
							
			y = this.spanY - this.buildingMeters.cornerHeight/2;
			this.makeViewPoint(x,y,7);
			
			x = this.spanX - (this.buildingMeters.cornerWidth/2);
			y = this.buildingMeters.coreShortSide/2 + this.buildingMeters.cornerHeight;
			this.makeViewPoint(x,y,3);
										
			x = (this.buildingMeters.coreLongSide/2) + this.buildingMeters.cornerWidth;				
			this.makeViewPoint(x,y,4);
								
			x = (this.buildingMeters.cornerWidth/2);				
			this.makeViewPoint(x,y,5);
							
			var target = buildingView.getCenterPoint();
			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [0,0,80];					// Set viewpoint eye
			vp.target = target;					// Set viewpoint target
			this.viewPoints['default'] = vp;
		
			return;			
		},
		
		makeViewPoint: function( x, y, idx) {

			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [x,this.spanZ/2, -y-6];					// Set viewpoint eye
			vp.target = [x,this.spanZ/1.5, -y];					// Set viewpoint target
			
			this.viewPoints[idx] = vp;

		},
		

		
		changeTarget: function( ) {

/*
			var target = this.buildingView.getCenterPoint();
			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = hemi.world.camera.vd.last.eye;					// Set viewpoint eye
			
			var target = this.buildingView.getCenterPoint();
			vp.target = target;					// Set viewpoint target

			
			this.viewPoints ['newTarget'] = vp;
			this.currentViewIdx = 'newTarget';
			
*/
		},
		
		
		getCurrentViewPoint : function() {
			
			return this.viewPoints [this.currentViewIdx];
		}
		
		
		
	};
	

	lgb.model.ViewPointModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












