

/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.Slider = function(userAction){
		this.userAction = userAction;
		this.min = 0;
		this.max = 99;
		this.value = 50;
	};
	
	lgb.view.component.Slider.prototype = {
		getHTML : function() {
			
			var html = '<input id="{0}" type="range" min="{1}" max="{2}" value="{3}">';
			html = html.format(this.userAction.id, this.min, this.max, this.value);		
				
			return html;
		}
	};

	
	return lgb;
	
})(lgb || {});











