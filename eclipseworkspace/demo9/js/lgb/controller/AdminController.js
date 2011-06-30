

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the Admin interface
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.AdminController = function() {
		
		lgb.controller.ControllerBase.call(this);
		this.adminPanel =  new lgb.view.AdminPanel();
		
		this.listen(lgb.event.Event.USER_ACTIONS_CREATED, this.onUserActionsCreated);
		this.listen(lgb.event.Loader.ALL_MESHES_LOADED, this.onMeshesLoaded);

	};
	
	
	lgb.controller.AdminController.prototype = {
		

		onUserActionsCreated : function(event) {
			
			var dataModel = event.value;
			dataModel.assertType(lgb.model.ModelBase);
			
			this.adminPanel.processOne(dataModel);
		},
		onMeshesLoaded : function(event) {
		
			this.adminPanel.injectHtml();
		}


	};
	
	lgb.controller.AdminController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










