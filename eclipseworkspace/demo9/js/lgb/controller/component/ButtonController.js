

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	lgb.controller.component = lgb.controller.component || {};
	
	
	/**
	 * @class MVC controller for the ButtonController
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.component.ButtonController = function(dataModel) {
		
		lgb.controller.ControllerBase.call(this);
		dataModel.assertType(lgb.model.component.Trigger);
		
		this.dataModel = dataModel;
		this.view = new lgb.view.component.Button(dataModel);
		
	};
	
	
	lgb.controller.component.ButtonController.prototype = {
		
		
		bindEvents : function() {

			//this.view.bindEvents($.proxy(this.onChange, this));
			this.view.bindEvents();
			
		},
		
		onChange : function(event) {

			this.view.bindEvents();
			
		},
		
		getHTML : function() {
			return this.view.getHTML();
		}

	};
	
	lgb.controller.component.ButtonController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










