
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.GuiPosition = function(selector){
		lgb.view.ViewBase.call(this);
		
		this.selector = selector;

		this.centerX = false;
		this.centerY = false;
		this.y = 0;
		this.x = 0; 
		this.adjustAfterResize = false;
		
		
	};
	
	
	
	lgb.view.GuiPosition.prototype = {
	
			
		init : function() {
			this.injectHtml();
			this.bindEvents();
		},
			
		show : function() {
			
			 this.getSelector().animate(
			  	{top: 0}, 
				2000,
				this.d(this.onShowComplete) 
			  );

		},
		onShowComplete : function(event) {
			console.log('onShowComplete');
		},
		onClick : function(event) {
			
			
			console('onClick');
		},
		
		injectHtml : function() {
			
			var html = '<div id="{0}"></div>'.format(this.htmlID);
			this.append(html);
			
			var selector = this.getSelector();
			
			var leftPx = ($(window).width() - selector.outerWidth()) / 2 + $(window).scrollLeft();
			selector.css("left", leftPx.toString() + "px");
			
		},
		bindEvents : function() {

			this.getSelector().click( this.d(this.onClick) );
			
		}


		
	};

	lgb.view.GuiPosition.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











