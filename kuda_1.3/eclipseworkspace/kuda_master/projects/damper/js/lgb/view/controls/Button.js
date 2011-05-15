o3djs.require('lgb.model.UserAction');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};
	lgb.view.controls = lgb.view.controls || {};


	lgb.view.controls.Button = function(userAction){
		this.userAction = userAction;
	};
	
	lgb.view.controls.Button.prototype = {
		getHTML : function() {
			
			var html =  '\t\t<button id="{0}" type="button">{0}</button><br />\n'.format(this.userAction.name);
			return html;
		}
	};

	
	return lgb;
	
})(lgb || {});











