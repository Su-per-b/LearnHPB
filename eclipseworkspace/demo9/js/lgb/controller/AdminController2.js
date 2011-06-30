

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the Admin interface
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.AdminController2 = function() {
		
		lgb.controller.ControllerBase.call(this);
		this.adminView =  new lgb.view.AdminView();
		
		this.listen(lgb.event.Event.USER_ACTIONS_CREATED, this.onUserActionsCreated);
		this.listen(lgb.event.Loader.ALL_MESHES_LOADED, this.onMeshesLoaded);

	};
	
	
	lgb.controller.AdminController2.prototype = {
		
		onUserActionsCreated : function(event) {
			
			var dataModel = event.value;
			dataModel.assertType(lgb.model.ModelBase);
			
			this.adminView.processOne(dataModel);
		},
		onMeshesLoaded : function(event) {
		
			this.adminView.injectHtml();
		}
		
	};
	
	lgb.controller.AdminController2.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










