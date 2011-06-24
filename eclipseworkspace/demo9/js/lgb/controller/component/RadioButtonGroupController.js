

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	lgb.controller.component = lgb.controller.component || {};
	
	
	/**
	 * @class MVC controller for the RadioButtonGroupController
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.component.RadioButtonGroupController = function(dataModel) {
		
		lgb.controller.ControllerBase.call(this);
		dataModel.assertType(lgb.model.component.SelectionGroup);
		
		this.dataModel = dataModel;
		this.view = new lgb.view.component.RadioButtonGroup(dataModel);
		
	};
	
	
	lgb.controller.component.RadioButtonGroupController.prototype = {
		
		
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
	
	lgb.controller.component.RadioButtonGroupController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










