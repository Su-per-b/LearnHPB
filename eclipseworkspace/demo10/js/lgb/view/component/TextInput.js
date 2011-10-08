

/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.TextInput = function(dataModel){
		
		lgb.view.ViewBase.call(this);
		
		dataModel.assertType(lgb.model.component.TextInput);
		
		this.dataModel = dataModel;
	};
	
	lgb.view.component.TextInput.prototype = {
		
		getHTML : function() {
			
			var html = 
			'<h5>{0}</h5>\
			<input type="text" id="{1}" \
			class="component-TextInput" name="{1}" value="0"  /><br />\
			'.format(this.dataModel.title, this.dataModel.id);
			

			
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
	

	lgb.view.component.TextInput.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











