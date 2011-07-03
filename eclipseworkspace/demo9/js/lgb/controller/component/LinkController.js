

var lgb = (function(lgb) {

	lgb.controller = lgb.controller || {};
	lgb.controller.component = lgb.controller.component || {};
	
	
	/**
	 * @class MVC controller for the LinkController
	 * @extends lgb.controller.ControllerBase
	 */
	lgb.controller.component.LinkController = function(dataModel) {
		
		lgb.controller.ControllerBase.call(this);
		dataModel.assertType(lgb.model.component.Link);
		
		this.dataModel = dataModel;
		this.view = new lgb.view.component.Link(dataModel);
		
	};
	
	
	lgb.controller.component.LinkController.prototype = {
		
		
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
	
	lgb.controller.component.LinkController.inheritsFrom(lgb.controller.ControllerBase);

	return lgb;
	
})(lgb || {});










