goog.provide ("lgb.view.PropertiesButtonView");
goog.require ("lgb.view.ViewBase");
goog.require ("lgb.view.component.ToggleButtonA");
goog.require ("lgb.event.MakeViewActive");


	lgb.view.PropertiesButtonView = function(){
		lgb.view.ViewBase.call(this);
		this.htmlID = "propertiesButton";
	};
	
	goog.inherits(lgb.view.PropertiesButtonView, lgb.view.ViewBase);
		
	lgb.view.PropertiesButtonView.prototype.init  = function(){
		
		this.button = 
			new lgb.view.component.ToggleButtonA( {
				htmlId : "propertiesButtonLink",
				buttonHeight: 33,
				xPosition : 0,
				title : "Show / Hide Properties panel", 
				cssClass : "leftNavButton"
			});
			
			this.injectCss();
			this.injectHtml();
			this.bindEvents();
			this.isSelected = false;
			this.listen(lgb.event.WindowResizeEvent, this.onResize);
	};
	
	lgb.view.PropertiesButtonView.prototype.show  = function(){
		this.position();
		
	};
	lgb.view.PropertiesButtonView.prototype.position = function() {

		var x = this.getXpos();
		
		var props = {left: x + 'px'}
		this.getJq().css(props);
 
	};
	
	lgb.view.PropertiesButtonView.prototype.onResize = function() {
		
		var x = this.getXpos();
		
		var options = {
			duration:500,
			easing:"easeInOutSine"
		}
		var props = {left: x + 'px'}
		
		this.getJq().animate(
        	props, 
        	options
    	);
                    	
                    	

	};
	
	
	lgb.view.PropertiesButtonView.prototype.getXpos = function() {
		return window.innerWidth -33 - 33 -4;
	};
	
	
	lgb.view.PropertiesButtonView.prototype.injectHtml  = function(){
		var html = '<div id="propertiesButton">' + this.button.getHtml() +
					'</div>';


		 this.append(html);
	};
	
	lgb.view.PropertiesButtonView.prototype.injectCss = function() {
			/*
			var cssInner = '\
			#leftNav {\
			    position:absolute;\
				width:63px;\
				height:352px;\
				left:-63px;\
				top:200px;\
			    z-index:10;\
			    background-color:transparent;\
			    background-image:url("images/leftnav.png");\
			    background-repeat:no-repeat;\
			    opacity:0.92;\
			    padding: 60px 0 0 10px;\
			}\n\
			.leftNavButton {\
				width:42px;\
				height:42px;\
				display:block;\
				background-color:transparent;\
				margin:0 0 10px 0;\
				background-image:url("images/icon_grid_42.png");\
			}\n\
			';
			*/
			

			var cssInner  = this.button.getCss();
			
			var cssStr = "<style type='text/css'>{0}</style>".format(cssInner);
			
			$(cssStr).appendTo("head");
	};
	
	
	
	lgb.view.PropertiesButtonView.prototype.setSelected  = function(isSelected){
		this.isSelected = isSelected;
		
		if (this.isSelected) {
			$('#propertiesButtonLink').addClass("selected");
		} else {
			$('#propertiesButtonLink').removeClass("selected");
		}

	};
	
	lgb.view.PropertiesButtonView.prototype.bindEvents  = function(){

		$('#propertiesButtonLink').click(this.d(this.onClick));

		var toolTipConfig = {
		  skin: 'light',
			hook: {
			  target: 'leftmiddle',
			  tooltip: 'rightmiddle'
			},
			background: { color: '#fff', opacity: .85 },
		  closeButton: false
		};
		
		Tipped.create('#propertiesButtonLink', toolTipConfig);
	};
	
	lgb.view.PropertiesButtonView.prototype.onClick  = function(){
		this.dispatchLocal(new lgb.event.MakeViewActive(!this.isSelected));
	};
	
















