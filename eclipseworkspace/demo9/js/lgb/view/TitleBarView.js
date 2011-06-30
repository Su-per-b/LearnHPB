
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.TitleBarView = function(){
		lgb.view.ViewBase.call(this);
		this.htmlID = "titleBar";
	};
	
	lgb.view.TitleBarView.prototype = {
	
			
		init : function() {
			this.injectHtml();
			this.bindEvents();
			this.initMenu({centerX: true,targetTop: -41});
		},
			
		show : function() {
			 this.floatingObj.targetTop = 0;
		},
		
		onShowComplete : function(event) {
			console.log('onShowComplete');
		},
		onClick : function(event) {
			console.log('onClick');
		},
		
		injectHtml : function() {
			
			var html = '<div id="{0}"></div>'.format(this.htmlID);
			this.append(html);	
		},
		bindEvents : function() {

			this.getSelector().click( this.d(this.onClick) );
			
		}

	};

	lgb.view.TitleBarView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











