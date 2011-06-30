
/**
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class MVC model for Button Controls
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.component.Trigger = function(title, eventName, id) {
		lgb.model.ModelBase.call(this);
		
		this.title = title;
		this.eventName = eventName;
		this.id = this.generateId();


	};


	lgb.model.component.Trigger.prototype = {
		generateId: function() {
			var id = this.eventName.split('_').join('-');
			return id;

		}

		
	};
	


	lgb.model.component.Trigger.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});












