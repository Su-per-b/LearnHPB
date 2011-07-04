
/**
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class base MVC model for HTML Controls
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.component.ComponentBase = function(parentName, title, value) {
		lgb.model.ModelBase.call(this);
		
		this.parentName = parentName;
		this.title = title;
		this.value = value;
		this.id = this.generateId();
	};
	


	lgb.model.component.ComponentBase.prototype = {
		
		/*
		* generate the id from the name and the title
		*/
		generateId: function() {
			
			var id = '{0}--{1}'.format(this.parentName, this.title);
			id = id.split('_').join('-');
			id = id.split(' ').join('-');
			id = id.split(':').join('-');
			
			return id;

		}

	};
	


	lgb.model.component.ComponentBase.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});












