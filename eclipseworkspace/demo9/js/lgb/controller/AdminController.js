

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the Admin interface
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.AdminController = function() {
		
		lgb.controller.ControllerBase.call(this);


	};
	
	
	lgb.controller.AdminController.prototype = {
		
		init: function(dataModelArray) {
			
			dataModelArray.assertContainsType(lgb.model.ModelBase);
			
			this.adminPanel =  new lgb.view.AdminPanel();
			this.adminPanel.processAll(dataModelArray);
			this.adminPanel.injectHtml();
			
			//this.listen(this.dataModel.name, this.onGuiEvent);
			
		},

		
		onGuiEvent : function(event) {


			
		},



	
	};
	
	lgb.controller.AdminController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










