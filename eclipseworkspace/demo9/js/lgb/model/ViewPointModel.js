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
		
		this.viewPoints = {};	
		
		
		this.userActions = [];
		
		//create a trigger for each zone
	
		var trigger = new lgb.model.component.Link(
				this.name,
				'Starting Viewpoint',
				'default'
			);

		trigger.addEvents( 
			lgb.event.ViewPointEvent.GO_TO, 
			lgb.event.ViewPointEvent.SHOW, 
			lgb.event.ViewPointEvent.HIDE
		);
		
		this.userActions.push(trigger);
		
		
		
/*
		var trigger = new lgb.model.component.Link(
				this.name,
				'All Zones',
				'Zone 0'
			);

		trigger.addEvents( 
			lgb.event.ZoneEvent.GO_TO, 
			lgb.event.ZoneEvent.SHOW, 
			lgb.event.ZoneEvent.HIDE
		);
		
		this.userActions.push(trigger);
		
*/
		for (var i=1; i<10; i++) {
				
			var zoneNumber = i;
			var title = 'Zone {0} Viewpoint'.format(zoneNumber.toString());
			
			var trigger = new lgb.model.component.Link(
					this.name,
					title,
					'Zone {0}'.format(zoneNumber)
				);

			trigger.addEvents( 
				lgb.event.ViewPointEvent.GO_TO, 
				lgb.event.ViewPointEvent.SHOW, 
				lgb.event.ViewPointEvent.HIDE
			);
		
				
			this.userActions.push(trigger);
			
		}
		
		
		
		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
			
	};




	lgb.model.ViewPointModel.prototype = {
		
		
		//this dataModel is based on the BuildingView
		init: function(buildingView) {
			
			this.buildingView = buildingView;
			var target = buildingView.getCenterPoint();
			target[1] +=6;
			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [22.13,28.43,-82.31];					// Set viewpoint eye
			vp.target = target;					// Set viewpoint target
			this.viewPoints['default'] = vp;
		
			return;			
		},
		
		processZones : function (zoneShapeAry) {
			

			for (var i=0, il = zoneShapeAry.length; i<il; i++) {
				

				var zoneShape = zoneShapeAry[i];
				
				var vp = new hemi.view.Viewpoint();
				
				var x = zoneShape.x;
				var y = zoneShape.y;
				var z = zoneShape.z; 


				vp.target = lgb.convertPoint([x,y,z]);	
				

				vp.eye = lgb.convertPoint([x,y-6,z]);	
				
				var viewPointName = 'Zone {0}'.format(zoneShape.zoneNumber);
				this.viewPoints[viewPointName] = vp;	
			}
						

		},
		goToZone : function (zoneNumber) {
			var viewpointName = 'Zone {0}'.format(zoneNumber);
			this.goTo(viewpointName);

		},
		goTo : function (viewPointName) {
			
			//if (this.currentViewIdx !== viewPointName) {
				this.currentViewIdx = viewPointName;
				this.dispatchLocal(lgb.event.Event.DATA_MODEL_CHANGED);
			//}
			
		},

/*
		makeViewPointxx: function( x, y, idx) {

			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = [x,this.spanZ/2, -y-6];					// Set viewpoint eye
			vp.target = [x,this.spanZ/1.5, -y];					// Set viewpoint target
			
			
			this.viewPoints[idx] = vp;

		},
*/
		

	/*	
		changeTarget: function( ) {


			var target = this.buildingView.getCenterPoint();
			
			var vp = new hemi.view.Viewpoint();		// Create a new Viewpoint
			vp.eye = hemi.world.camera.vd.last.eye;					// Set viewpoint eye
			
			var target = this.buildingView.getCenterPoint();
			vp.target = target;					// Set viewpoint target

			
			this.viewPoints ['newTarget'] = vp;
			this.currentViewIdx = 'newTarget';
			

		},*/
		
		
		getCurrentViewPoint : function() {
			
			return this.viewPoints [this.currentViewIdx];
		}
		
		
		
	};
	

	lgb.model.ViewPointModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












