




/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.model = lgb.model || {};
	
	/**
	 * @class MVC model for the building envelope
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.CameraModel = function() {
		
		lgb.model.ModelBase.call(this);


		this.title = "Camera";
		
		this.eye = [0,0,0];
		this.target = [0,0,0];
		

		var selectionGroup1 = new lgb.model.component.SelectionGroup(
				'Select Floor-To-Ceiling Height',
				lgb.event.BuildingEvent.CHANGE_FLOOR_HEIGHT
			);
		
		
		selectionGroup1.createItem('9 ft', 9, true);
		selectionGroup1.createItem('11 ft', 11);
		selectionGroup1.createItem('13 ft', 13);
		
		var selectionGroup2 = new lgb.model.component.SelectionGroup(
				'Select Number of Stories',
				lgb.event.BuildingEvent.CHANGE_NUMBER_OF_FLOORS
			);
		
		selectionGroup2.createItem('3 floors', 3);
		selectionGroup2.createItem('5 floors', 5, true);
		selectionGroup2.createItem('7 floors', 7);
		
		
		this.userActions = [selectionGroup1, selectionGroup2];


	};


	lgb.model.CameraModel.prototype = {
		

		
	};
	

	lgb.model.CameraModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












