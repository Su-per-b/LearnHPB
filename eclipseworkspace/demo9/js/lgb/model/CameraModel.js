




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


		this.title = "Camera Info";
		this.name = "CAMERA";
		

		

		var selectionGroup1 = new lgb.model.component.SelectionGroup(
				'Select Floor-To-Ceiling Height',
				lgb.event.BuildingEvent.CHANGE_FLOOR_HEIGHT
			);
		
		
		selectionGroup1.createItem('up', 9, true);
		selectionGroup1.createItem('11 ft', 11);
		selectionGroup1.createItem('13 ft', 13);
		
		
		this.userActions = [selectionGroup1];
		this.dispatch(lgb.event.Event.USER_ACTIONS_CREATED, this);

	};


	lgb.model.CameraModel.prototype = {
		

		
	};
	

	lgb.model.CameraModel.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












