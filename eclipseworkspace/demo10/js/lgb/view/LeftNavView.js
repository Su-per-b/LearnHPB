
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.LeftNavView = function(dataModel){
		lgb.view.ViewBase.call(this);
		this.htmlID = "leftNav";
		this.init_();
	};
	
	lgb.view.LeftNavView.prototype = {
	
			
		init_ : function() {
			
			//this.button1 = new lgb.view.component.ToggleButton();

			this.currentlySelectedID = 'none';
			this.injectHtml();
			this.bindEvents();
			this.showSelected("leftNavButton_1");
			this.initMenu({targetBottom: 90,targetLeft: -63});

		},
			
		show : function() {
			this.floatingObj.targetLeft = 0;
		},
			
		injectHtml : function() {
			
			var html = 
			'<div id="leftNav">\n' + 
				'\t<a id="leftNavButton_1" class="leftNavButton" title="General" href="#"></a>\n' +
				'\t<a id="leftNavButton_2" class="leftNavButton" title="HVAC" href="#"></a>\n' +
				'\t<a id="leftNavButton_3" class="leftNavButton" title="External Envelope" href="#"></a>\n' +
				//'\t<a id="leftNavButton_4" class="leftNavButton" title="Lighting" href="#"></a>\n' +
				//'\t<a id="leftNavButton_5" class="leftNavButton" title="Day Lighting" href="#"></a>\n' +
			'</div>';
			
			 this.append(html);
			

			
		},
		
		showSelected : function(newSelectedId) {
			if (this.currentlySelectedID != newSelectedId) {
				
				
				if ('#' + this.currentlySelectedID != 'none') {
					$('#' + this.currentlySelectedID).removeClass("selected");
				}
				
				$('#' + newSelectedId).addClass("selected");
				this.currentlySelectedID = newSelectedId;
				
			}
			
			
		},
		bindEvents : function() {

			var delegate = this.d(this.onClick);
			
			$('#leftNavButton_1').click({mode:lgb.model.VisibilityTag.ALL},delegate);
			$('#leftNavButton_2').click({mode:lgb.model.VisibilityTag.HVAC},delegate);
			$('#leftNavButton_3').click({mode:lgb.model.VisibilityTag.ENVELOPE},delegate);
			
			
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
						

		},


		
		
		onClick : function(event) {
			//$('#'+event.target.id).addClass( "selected" );
			this.showSelected(event.target.id);
			this.dispatch(lgb.event.Visibility.GUI_SELECTION, event.data.mode);
		}
		
	};

	lgb.view.LeftNavView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











