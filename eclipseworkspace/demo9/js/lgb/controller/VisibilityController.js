



var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the building system visibility
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.VisibilityController = function() {
		
		lgb.controller.ControllerBase.call(this);
		

		this.listen(lgb.event.Visibility.GUI_SELECTION, this.onGUIselection);
		this.listen(lgb.event.Event.REGISTER_COMPONENT, this.onRegisterComponent);
	
		this.dataModel = new lgb.model.VisibilityModel();
		this.buildingComponentModelList = [];
		this.buildingComponentViewList = [];
		
	};
	
	
	lgb.controller.VisibilityController.prototype = {
		
		onGUIselection : function(event) {
			var state = event.value;
			var len = this.buildingComponentModelList.length;
			for (var i =0; i < len ; i++) {
				this.buildingComponentModelList[i].applyVisiblilityFilter(state);
			}
		},

		onRegisterComponent : function(event) {
			var buildingComponentModel = event.value;
			buildingComponentModel.assertType(lgb.model.BuildingComponentModel);
			
			this.buildingComponentModelList.push(buildingComponentModel);
			var view = new lgb.view.BuildingComponentView(buildingComponentModel);
			this.buildingComponentViewList.push(view);
		}

	
	};
	
	lgb.controller.VisibilityController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










