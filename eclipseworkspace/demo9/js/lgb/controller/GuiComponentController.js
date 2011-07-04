

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	
	
	/**
	 * @class MVC controller for the RadioButtonGroupController
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.GuiComponentController = function(uAct) {
		
		lgb.controller.ControllerBase.call(this);
		//dataModel.assertType(lgb.model.component.SelectionGroup);
		
		this.dataModel = uAct;

		
		if (uAct instanceof lgb.model.component.SelectionGroup) {
			this.view = new lgb.view.component.RadioButtonGroup(uAct);
		} else if (uAct instanceof lgb.model.component.Link) {
			this.view = new lgb.view.component.Link(uAct);
		}
				
		
		
	};
	
	
	lgb.controller.GuiComponentController.prototype = {
		
		
		bindEvents : function() {
			this.view.bindEvents();
		},
		
		onChange : function(event) {
			this.view.bindEvents();
		},
		
		getHTML : function() {
			return this.view.getHTML();
		}

	};
	
	lgb.controller.GuiComponentController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










