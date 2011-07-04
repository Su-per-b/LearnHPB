
/**
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class MVC model for TextInput Controls
	 * @extends lgb.model.ComponentBase
	 */
	lgb.model.component.TextInput = function(parentName, title, value) {
		lgb.model.component.ComponentBase.call(this, parentName, title, value);
	};
	


	lgb.model.component.TextInput.prototype = {
		

		
		addEvents : function(eventClick , eventMouseOver, eventMouseOut) {
			this.eventClick = eventClick;
			this.eventMouseOver = eventMouseOver;
			this.eventMouseOut = eventMouseOut;
		}

		

		
	};
	


	lgb.model.component.TextInput.inheritsFrom(lgb.model.component.ComponentBase);
	
	return lgb;
	
})(lgb || {});












