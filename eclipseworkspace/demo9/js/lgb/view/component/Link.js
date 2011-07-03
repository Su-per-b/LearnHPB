

/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.Link = function(dataModel){
		dataModel.assertType(lgb.model.component.Link);
		
		this.dataModel = dataModel;
	};
	
	lgb.view.component.Link.prototype = {
		
		getHTML : function() {
			var html =  '<a id="{0}" class="admin-link typeface-js" href="#">{1}</a> <br />'.format(this.dataModel.id, this.dataModel.title);
			return html;
		},
		
		bindEvents: function() {
			
			var selector = $(this.dataModel.id);
			
			if (lgb.notNull(this.eventClick)) {
				selector.bind('click',  this.d(this.onClick));
			}
			if (lgb.notNull(this.eventMouseOver)) {
				selector.bind('mouseover',  this.d(this.onMouseOver));
			}
			if (lgb.notNull(this.eventMouseOut)) {
				selector.bind('mouseout',  this.d(this.onMouseOut));
			}
			
		},
		onClick: function(event){
			this.dispatch(this.dataModel.eventClick, this.dataModel.value);
		},	
		onMouseOver: function(event){
			this.dispatch(this.dataModel.eventMouseOver, this.dataModel.value);
		},
		onMouseOut: function(event){
			this.dispatch(this.dataModel.eventMouseOut, this.dataModel.value);
		},
		
		
		
		
	};

	
	return lgb;
	
})(lgb || {});











