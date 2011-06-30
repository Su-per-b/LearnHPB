

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the Admin interface
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.AdminController2 = function() {
		
		lgb.controller.ControllerBase.call(this);
		this.view =  new lgb.view.AdminView();
		
		this.listen(lgb.event.Event.USER_ACTIONS_CREATED, this.onUserActionsCreated);
		this.listen(lgb.event.Loader.ALL_MESHES_LOAD_START, this.onMeshesLoadStart);
		this.listen(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
		
	};
	
	
	lgb.controller.AdminController2.prototype = {
		
		onUserActionsCreated : function(event) {
			
			var dataModel = event.value;
			dataModel.assertType(lgb.model.ModelBase);
			
			this.view.processOne(dataModel);
		},
		onMeshesLoadStart : function(event) {
			this.view.init();
		},
		onCameraMoveComplete : function(event) {
			this.unlisten(lgb.event.Cam.MOVE_COMPLETE, this.onCameraMoveComplete);
			this.view.show();
		},
		
	};
	
	lgb.controller.AdminController2.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










