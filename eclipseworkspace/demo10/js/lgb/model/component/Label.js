
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class MVC model for select controls like RadioButtonGroup
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.component.Label = function(title, eventName, id) {
		
		lgb.model.ModelBase.call(this);
		
		this.title = title;
		this.eventName = eventName;
		
		this.id = this.generateId();

	};


	lgb.model.component.Label.prototype = {
		
		generateId: function() {
			var id = this.eventName.split('_').join('-');
			return id;
		}

	};
	

	lgb.model.component.Label.inheritsFrom(lgb.model.ModelBase);
	
	
	return lgb;
	
})(lgb || {});












