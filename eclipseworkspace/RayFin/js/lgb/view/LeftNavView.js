goog.provide('lgb.view.LeftNavView');

goog.require ("lgb.view.ViewBase");
goog.require ("lgb.view.component.ToggleButtonA");



	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.LeftNavView = function(){
		lgb.view.ViewBase.call(this);
		this.htmlID = "leftNav";
		var that = this;
		
		init_();
		injectHtml_();
		injectCss_();
		makeToolTip_();
		listen_();
		
		this.showSelected("leftNavButton_1");
		
		function init_() {
			that.buttonGeneral = 
				new lgb.view.component.ToggleButtonA( {
					htmlId : "leftNavButton_1",
					xPosition : -42,
					title : "General", 
				});
			
			that.buttonHvac = 
				new lgb.view.component.ToggleButtonA( {
					htmlId : "leftNavButton_2",
					xPosition : -84,
					title : "HVAC", 
				});
				
			that.buttonEnvelope = 
				new lgb.view.component.ToggleButtonA( {
					htmlId : "leftNavButton_3",
					xPosition : -168,
					title : "External Envelope", 
				});
			
			that.currentlySelectedID = 'none';

			
		};
		
		function injectHtml_() {
			
			var top = that.getYpos();
			
				$('<div>')
				.attr('id', that.htmlID)
				.append(that.buttonGeneral.getHtml())
				.append(that.buttonHvac.getHtml())
				.append(that.buttonEnvelope.getHtml())
				.css({
				    position:'absolute',
					width:'53px',
					height:'292px',
					left:'-63px',
					top:top + 'px',
				    'z-index':'101',
				    'background-image':'url(images/leftnav.png)',
				    opacity:'0.92',
				    padding:'60px 0 0 10px'
					})
				.appendTo(that.getParentJq());
				
		};
		
		function injectCss_() {
				var cssInner = '\
				#leftNav a {\
					width:42px;\
					height:42px;\
					display:block;\
					background-color:transparent;\
					margin:0 0 10px 0;\
					background-image:url("images/icon_grid_42.png");\
				}\n\
				';
				
				cssInner  += that.buttonGeneral.getCss();
				cssInner  += that.buttonHvac.getCss();
				cssInner  += that.buttonEnvelope.getCss();
				
				var cssStr = "\n<style type='text/css'>{0}</style>".format(cssInner);
				
				$("head").append(cssStr);
		};
		
		function makeToolTip_() {
			var toolTipConfig = {
			  skin: 'light',
				hook: {
				  target: 'rightmiddle',
				  tooltip: 'leftmiddle'
				},
				background: { color: '#fff', opacity: .85 },
			  closeButton: false
			};
			
			Tipped.create('.leftNavButton', toolTipConfig);
		}
		
		function listen_() {
			that.listen(lgb.event.WindowResizeEvent, that.onResize);
		}
		

	};
	

	goog.inherits(lgb.view.LeftNavView, lgb.view.ViewBase);
	

	
	lgb.view.LeftNavView.prototype.getYpos = function() {
		return window.innerHeight -140 - 352;
	}
	
	lgb.view.LeftNavView.prototype.onResize = function() {
		
		var y = this.getYpos();
		
		var props = {top: y +'px'}
		var options = {
			duration:500,
			easing:"easeInOutSine"
		}
		
		this.getJq().animate(
        	props, 
        	options
    	);

	}
	
	lgb.view.LeftNavView.prototype.show = function() {

	  	this.getJq().animate({
	  		left: '0',
	  		easing:"easeInOutSine"
	  	}, 500);
	  	
	};


	lgb.view.LeftNavView.prototype.showSelected = function(newSelectedId) {
		if (this.currentlySelectedID != newSelectedId) {
			
			if ('#' + this.currentlySelectedID != 'none') {
				$('#' + this.currentlySelectedID).removeClass("selected");
			}
			
			$('#' + newSelectedId).addClass("selected");
			this.currentlySelectedID = newSelectedId;
			
		}
	};
	

	lgb.view.LeftNavView.prototype.onClick = function(event) {
			//this.showSelected(event.target.id);
			//this.dispatch(lgb.event.Visibility.GUI_SELECTION, event.data.mode);
	};
	

		

		














