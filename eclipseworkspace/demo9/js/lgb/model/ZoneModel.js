


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
		
		this.longSide = 125;
		this.shortSide = 80;
		this.cornerWidth = 15;
		this.cornerHeight =15;
		
		this.title = "Zones";
		this.name = "ZONES";
		
		this.userActions = [];
		
		//create a trigger for each zone
		for (var i=0; i<9; i++) {
				
			var zoneNumber = i + 1;
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
			
		}

	};
	
	

	lgb.model.ZoneModel.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});










