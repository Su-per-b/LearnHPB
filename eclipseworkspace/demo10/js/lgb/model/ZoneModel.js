


/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace MVC controller 
	 */
	lgb.model = lgb.model || {};
	
	lgb.model.ZoneModel = function(){
		lgb.model.ModelBase.call(this);
		
		this.dimFt = {
			longSide : 125,
			shortSide : 80,
			cornerWidth : 15,
			cornerHeight : 15,
			coreLongSide : 95,
			coreShortSide : 50,
		}

		
		this.title = "Zones";
		this.name = "ZONES";
		
		this.userActions = [];
		

		for (var i=1; i<10; i++) {
				
			var zoneNumber = i;
			var title = 'Zone {0}'.format(zoneNumber.toString());
			
			var trigger = new lgb.model.component.Link(
					this.name,
					title,
					zoneNumber
				);

			trigger.addEvents( 
				lgb.event.ZoneEvent.GO_TO, 
				lgb.event.ZoneEvent.SHOW, 
				lgb.event.ZoneEvent.HIDE
			);
		
				
			this.userActions.push(trigger);
			
		}
		

		
		
		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
	};
	
	
	lgb.model.ZoneModel.prototype = {
		
		init: function(modelList){
			this.modelList = modelList;
			this.view = lgb.view.gui;
			
		},
		processBoundingBox : function (floorBoundingBox) {


			this.extX = floorBoundingBox.maxExtent[0] - floorBoundingBox.minExtent[0]; //long side
			this.extY = floorBoundingBox.maxExtent[1] - floorBoundingBox.minExtent[1]; //narrow side
			this.extZ = floorBoundingBox.maxExtent[2] - floorBoundingBox.minExtent[2]; //floor height
			
			this.pxPerFoot = this.extX / this.dimFt.longSide;
			
			
			this.longSide = this.dimFt.longSide * this.pxPerFoot;
			this.shortSide = this.dimFt.shortSide * this.pxPerFoot;
			this.cornerExtX = this.dimFt.cornerWidth * this.pxPerFoot;
			this.cornerExtY = this.dimFt.cornerHeight * this.pxPerFoot;
			this.coreLongSide = this.dimFt.coreLongSide * this.pxPerFoot;
			this.coreShortSide = this.dimFt.coreShortSide * this.pxPerFoot;
			
			this.dim = {};
			
			this.dim.corner = [this.cornerExtX, this.cornerExtY];
			this.dim.middleLongSide = [this.cornerExtX, this.coreLongSide];
			this.dim.middleShortSide = [ this.coreShortSide, this.cornerExtY  ];
			this.dim.core = [  this.coreShortSide, this.coreLongSide  ];
			
		}
		

	};
	
	

	lgb.model.ZoneModel.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});










