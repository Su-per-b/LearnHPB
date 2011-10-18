goog.provide ("lgb.view.TitleBarView");
goog.require ("lgb.view.ViewBase");





	/**
	 * @class this is the MVC view class for the TitleBar
	 */
	lgb.view.TitleBarView = function(){

		lgb.view.ViewBase.call(this);
		this.htmlID = "titleBar";
		var that = this;

		function injectHtml_() {

			$('<div>')
			.attr('id', that.htmlID)
			.css({
					top:'-41px',
					width:'245px',
					height:'41px',
					'z-index':'101',
					'background-image':'url(images/top_title.png)'
				})
			.center({
				vertical : false
			})
			.appendTo(that.getParentJq());

		};
		
		function listen_() {
			that.listen(lgb.event.WindowResizeEvent, that.onResize);
		};
		

		injectHtml_();
		listen_();
		
	};


	goog.inherits(lgb.view.TitleBarView, lgb.view.ViewBase);



	lgb.view.TitleBarView.prototype.show = function() {

	  	this.getJq().animate({
	  		top: '0',
	  		easing:"easeInOutSine"
	  	}, 500);

	};
	
	
	lgb.view.TitleBarView.prototype.onResize = function() {
		
		var jq = this.getJq();
		
        jq.center({
        	vertical : false,
        	duration:500,
        	easing:"easeInOutSine"
        });
	}
	

	
	/*
	lgb.view.TitleBarView.prototype.injectCss = function() {


	var cssInner = '\
#titleBar {\
position:absolute;\
top:-41px;\
width:245px;\
height:41px;\
z-index:101;\
background-color:transparent;\
background-image:url("images/top_title.png");\
background-repeat:no-repeat;\
}';
			
			var cssStr = "\t<style type='text/css'>{0}</style>\n".format(cssInner);
		
			
			//$(cssStr).appendTo("head");
			$('head').append(cssStr);	
			

			
			
	};
*/




