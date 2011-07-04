
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.AdminButtonView = function(){
		lgb.view.ViewBase.call(this);
		this.htmlID = "adminButton";
		
	};
	
	lgb.view.AdminButtonView.prototype = {
	
			
		init : function() {
			this.injectHtml();
			this.bindEvents();
			this.initMenu({targetTop: 4,targetRight: -34});
		},
			
		show : function() {
			this.floatingObj.targetRight = 4;
		},
			
		injectHtml : function() {

			var html = '<div id="adminButton">\
						<a id="adminButtonLink" title="Admin" href="#"></a>\
						</div>';

/*
			var html = '<a id="adminButtonLink" title="Admin" href="#"></a>';
*/

			 this.append(html);
			
		},
		
		bindEvents : function() {

			$('#adminButtonLink').click({mode:'ALL'},this.d(this.onClick));

		},
		
		onClick : function(event) {
			this.dispatch(lgb.event.Event.TOGGLE_ADMIN_PANEL);
		}
		
	};

	lgb.view.AdminButtonView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











