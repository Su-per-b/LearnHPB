
/**
 */
var lgb = (function(lgb) {

	lgb.model = lgb.model || {};
	lgb.model.component = lgb.model.component || {};
	
	/**
	 * @class MVC model for Button Controls
	 * @extends lgb.model.ModelBase
	 */
	lgb.model.component.Link = function(parentName, title, value) {
		lgb.model.ModelBase.call(this);
		
		this.parentName = parentName;
		this.title = title;
		this.id = this.generateId();
		this.value = value;
	};
	


	lgb.model.component.Link.prototype = {
		
		/*
		* generate the id from the name and the title
		*/
		generateId: function() {
			
			var id = '{0}--{1}'.format(this.parentName, this.title);
			id = id.split('_').join('-');
			id = id.split(' ').join('-');
			
			return id;

		},
		
		addEvents : function(eventClick , eventMouseOver, eventMouseOut) {
			this.eventClick = eventClick;
			this.eventMouseOver = eventMouseOver;
			this.eventMouseOut = eventMouseOut;
		}

		

		
	};
	


	lgb.model.component.Link.inheritsFrom(lgb.model.ModelBase);
	
	return lgb;
	
})(lgb || {});












