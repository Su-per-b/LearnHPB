goog.provide('lgb.view.component.ToggleButtonA');
goog.require ("lgb.view.ViewBase");



lgb.view.component.ToggleButtonA = function(options){
	
	lgb.view.ViewBase.call(this);
	
	this.options =  $.extend({ // Default values
		htmlId : 'IDnotSet',
		xPosition : 0,
		buttonHeight: 42, // millisecond, transition time
		title:"link title not set",
		cssClass : false     
	}, options);
	               
};

goog.inherits(lgb.view.component.ToggleButtonA, lgb.view.ViewBase);

lgb.view.component.ToggleButtonA.prototype.getCss = function() {
	
	var cssInner = this.makeBackgroundPosition('', 0);
	cssInner += this.makeBackgroundPosition(':hover', 1);
	cssInner += this.makeBackgroundPosition('.selected', 2);
	cssInner += this.makeBackgroundPosition('.selected:hover ', 3);
	cssInner += this.makeBackgroundPosition(':active', 4);
	cssInner += this.makeBackgroundPosition('.selected:active', 4);
	
	return cssInner;
	
	//var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);


	//$(cssStr).appendTo("head");
};


lgb.view.component.ToggleButtonA.prototype.getHtml = function() {
	
		var cssClass = "";
		if (this.options.cssClass) {
			cssClass = ' class="{0}"'.format(this.options.cssClass);
		}
		
		
		var html = 
		'<a id="{0}" title="{1}"{2} href="#"></a>'
		.format(this.options.htmlId, this.options.title, cssClass);

		 return html;
};


lgb.view.component.ToggleButtonA.prototype.makeBackgroundPosition = function(appendToSelector, yPosition) {
	var pixelShift = this.options.buttonHeight * yPosition * -1;
	
	var cssStr = 
	"#{0}{1}{background-position: {2}px {3}px;}"
	.format( this.options.htmlId , 
		appendToSelector, 
		this.options.xPosition.toString(), 
		pixelShift.toString());
	
	return cssStr;
};
		










