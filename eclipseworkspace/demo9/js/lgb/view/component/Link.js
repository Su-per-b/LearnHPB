

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
		
		lgb.view.ViewBase.call(this);
		
		dataModel.assertType(lgb.model.component.Link);
		
		this.dataModel = dataModel;
	};
	
	lgb.view.component.Link.prototype = {
		
		getHTML : function() {
			var html =  '<a id="{0}" class="admin-link typeface-js" href="#">{1}</a> <br />'.format(this.dataModel.id, this.dataModel.title);
			return html;
		},
		
		bindEvents: function() {
			
			var selector = this.getSelector(this.dataModel.id); //$(this.dataModel.id);
			
			if (lgb.notNull(this.dataModel.eventClick)) {
				var func = this.d(this.onClick);
				selector.bind('click',  func);
			}
			if (lgb.notNull(this.dataModel.eventMouseOver)) {
				selector.bind('mouseover',  this.d(this.onMouseOver));
			}
			if (lgb.notNull(this.dataModel.eventMouseOut)) {
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
	

	lgb.view.component.Link.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











