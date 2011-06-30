

/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.Link = function(userAction){
		this.userAction = userAction;
	};
	
	lgb.view.component.Link.prototype = {
		getHTML : function() {
			var html =  '\t\t<a id="{0}" href="#">{0}</a> <br />\n'.format(this.userAction.id);
			return html;
		}
	};

	
	return lgb;
	
})(lgb || {});











