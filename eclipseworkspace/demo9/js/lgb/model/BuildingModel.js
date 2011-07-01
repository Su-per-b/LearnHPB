




/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the building envelope
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.BuildingModel = function() {
		
		lgb.model.ModelBase.call(this);

		this.title = "Envelope";
		this.name = "BUILDING";
		
		this.floorHeight = 9; //floor to ceiling height in ft
		this.totalFloors = 5;
		
		this.envelopeModel = new lgb.model.EnvelopeModel();
		this.HVACmodel = new lgb.model.HVACmodel();
		this.roofTopModel = new lgb.model.RoofTopModel();
		
		
		var selectionGroup1 = new lgb.model.component.SelectionGroup(
				'Select Floor-To-Ceiling Height',
				lgb.event.BuildingEvent.CHANGE_FLOOR_HEIGHT
			);
			
		selectionGroup1.createItem('13 ft', 13);
		selectionGroup1.createItem('11 ft', 11);
		selectionGroup1.createItem('9 ft', 9, true);
		
		var selectionGroup2 = new lgb.model.component.SelectionGroup(
				'Select Number of Stories',
				lgb.event.BuildingEvent.CHANGE_NUMBER_OF_FLOORS
			);
			
		selectionGroup2.createItem('7', 7);
		selectionGroup2.createItem('5', 5, true);
		selectionGroup2.createItem('3', 3);

		this.userActions = [selectionGroup1, selectionGroup2];
		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);
	};


	lgb.model.BuildingModel.prototype = {
		
		getBuildingHeight: function() {
			return this.floorHeight * this.totalFloors;
		},
		
		setFloorHeight: function(floorHeight) {
			this.floorHeight = floorHeight;
			this.dispatch(lgb.event.BuildingEvent.DATA_MODEL_CHANGED);
		},
		setTotalFloors: function(totalFloors) {
			this.totalFloors = totalFloors;
			this.dispatch(lgb.event.BuildingEvent.DATA_MODEL_CHANGED);
		}
		

		
	};
	

	lgb.model.BuildingModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












