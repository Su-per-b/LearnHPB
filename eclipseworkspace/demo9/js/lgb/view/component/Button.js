

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.Button = function(userAction){
		lgb.view.ViewBase.call(this);
		this.userAction = userAction;
	};
	
	lgb.view.component.Button.prototype = {
		getHTML : function() {
			
			var html =  '\t\t<button id="{0}" type="button">{0}</button><br />\n'.format(this.userAction.id);
			return html;
		}
	};

	lgb.view.component.Button.inheritsFrom(lgb.view.ViewBase);
	return lgb;
	
})(lgb || {});











