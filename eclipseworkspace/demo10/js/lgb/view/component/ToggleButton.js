

/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};
	lgb.view.component = lgb.view.component || {};


	lgb.view.component.ToggleButton = function(linkSelector, xPosition, buttonHeight){
		
		lgb.view.ViewBase.call(this);
		this.xPosition = xPosition;
		this.buttonHeight = buttonHeight;
		this.linkSelector = linkSelector;

	};
	
	lgb.view.component.ToggleButton.prototype = {
		
		attachCSS : function() {

			

			var cssInner = this.makeBackgroundPosition('', 0);
			cssInner += this.makeBackgroundPosition(':hover', 1);
			cssInner += this.makeBackgroundPosition('.selected', 2);
			cssInner += this.makeBackgroundPosition('.selected:hover ', 3);
			cssInner += this.makeBackgroundPosition(':active', 4);
			cssInner += this.makeBackgroundPosition('.selected:active', 4);
			
			
			var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);


			$(cssStr).appendTo("head");
			

			
		},
		
		makeBackgroundPosition : function(appendToSelector, yPosition) {
			
			var pixelShift = this.buttonHeight * yPosition * -1;
			
			var cssStr = 
			"#{0}{1}{background-position: {2}px {3}px;}"
			.format( this.linkSelector , 
				appendToSelector, 
				this.xPosition.toString(), 
				pixelShift.toString());
			
			return cssStr;
		}	
		
		
		
		
	};
	

	lgb.view.component.ToggleButton.inheritsFrom(lgb.view.ViewBase);
	
	return lgb;
	
})(lgb || {});











