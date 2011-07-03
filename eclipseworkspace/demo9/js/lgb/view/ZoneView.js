
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Visibility
	 */
	lgb.view.ZoneView = function(dataModel){
		lgb.view.ViewBase.call(this, dataModel);
		
	
	};
	
	lgb.view.ZoneView.prototype = {
	

		show : function(buildingView) {
			this.init(buildingView);
		},
		onChange : function() {
			
		},
		init_: function(buildingView) {


			var floorMesh = buildingView.envelopeView.getOriginalMesh();
			var bb = floorMesh.root.boundingBox;
			
			this.dataModel.processBoundingBox(bb);
			
			this.zones = [];
			this.viewPoints = [];
			
			var zoneShape = new lgb.view.ZoneShape
				(this.dataModel.extY, this.dataModel.extX, this.dataModel.extZ,0,0);
				
			this.zones[0] = zoneShape;
			
			var dim = this.dataModel.dim;
			
			var x = this.dataModel.extX - this.dataModel.cornerExtX;
			var y = 0;
			this.makeZone(	dim.corner, x, y, 1);
							
			x = 0;
			this.makeZone(dim.corner,x,y,3);
			
			y = this.dataModel.extY - this.dataModel.cornerExtY;
			this.makeZone(dim.corner,x,y,9);

			x = this.dataModel.extX - (this.dataModel.cornerExtX);
			this.makeZone(dim.corner,x,y,7);
			
			x =  this.dataModel.cornerExtX;
			y = 0;
			this.makeZone(dim.middleLongSide,x,y,2);
							
			y = this.dataModel.extY - this.dataModel.cornerExtY;
			this.makeZone(dim.middleLongSide,x,y,8);
			
			x = this.dataModel.extX - this.dataModel.cornerExtX;
			y = this.dataModel.cornerExtY;	
			this.makeZone(dim.middleShortSide,x,y,4);	
										
			x =  this.dataModel.cornerExtX;				
			this.makeZone(dim.core,x,y,5);	
								
			x = 0;				
			this.makeZone(dim.middleShortSide,x,y,6);	
							
		
			return;	
								
		},
		positionAllZones: function(buildingView) {
			if (lgb.isNull(this.zones)) {
				this.init_(buildingView);
			}
			
			this.verticalHeight = buildingView.envelopeView.getMeshHeight();	
			this.each(this.zones, this.positionOneZone);
		},
		positionOneZone: function(zoneShape) {
			zoneShape.position(this.verticalHeight);
		},
		
		
/*
		onSwitchViewPoint: function(event) {
			
			var idx = parseInt(event.zoneNumber);
			
			var viewPoint = this.viewPoints[idx];
			hemi.world.camera.moveToView(viewPoint,60);
			
		},
*/
		showZone: function(zoneNumber) {
			this.zones[zoneNumber].show();
		},
		hideZone: function(zoneNumber) {
			this.zones[zoneNumber].hide();
		},

		
		makeZone: function(dim, xPos, yPos, zoneNumber) {

			
			var zoneShape = new lgb.view.ZoneShape
				(dim[0], 
				dim[1], 
				this.dataModel.extZ,
				xPos,
				yPos
				);
			

			zoneShape.position(this.verticalHeight);
			this.zones[zoneNumber] = zoneShape;
			
				
/*
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [x,this.dataModel.extZ/2, -y-6];					// Set viewpoint eye
			vp.target = [x,this.dataModel.extZ/1.5, -y];					// Set viewpoint target
			

			this.viewPoints[zoneNumber] = vp;
			
*/

			return;
/*
			var shapeBlueCamera = hemi.shape.create({
				shape: 'box',
				color: [0,0,1,0.9],
				h:  1, w: 1, d: 1 });
				
			shapeBlueCamera.translate(vp.eye[0], vp.eye[1], vp.eye[2]);
			
			
			var shapeGreenTarget = hemi.shape.create({
				shape: 'box',
				color: [0,1,0,0.9],
				h:  1, w: 1, d: 1 });
				
			shapeGreenTarget.translate(vp.target[0], vp.target[1], vp.target[2]);
*/
			
			

			
		}	



	};

	lgb.view.ZoneView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











