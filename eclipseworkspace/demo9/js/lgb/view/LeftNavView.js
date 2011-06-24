
o3djs.require('lgb.view.AdminSubpanel');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.LeftNavView = function(){
		lgb.view.ViewBase.call(this);
		this.htmlID = "leftNav";
		
	
	};
	
	lgb.view.LeftNavView.prototype = {
	
			
		init : function() {
			this.injectHtml();
			this.bindEvents();
		},
			
		injectHtml : function() {
			
			var htmlBoilerplate = 
			'<div id="leftNav">\n' + 
				'\t<a id="leftNavButton_1" class="leftNavButton" title="General" href="#"></a>\n' +
				'\t<a id="leftNavButton_2" class="leftNavButton" title="HVAC" href="#"></a>\n' +
				'\t<a id="leftNavButton_3" class="leftNavButton" title="External Envelope" href="#"></a>\n' +
				'\t<a id="leftNavButton_4" class="leftNavButton" title="Lighting" href="#"></a>\n' +
				'\t<a id="leftNavButton_5" class="leftNavButton" title="Day Lighting" href="#"></a>\n' +
			'</div>';
	
			 $('body').append(htmlBoilerplate);
			

		},
		
		bindEvents : function() {

			var delegate = this.d(this.onClick);
			
			$('#leftNavButton_1').click({mode:'ALL'},delegate);
			$('#leftNavButton_2').click({mode:'HVAC'},delegate);
			$('#leftNavButton_3').click({mode:'ENVELOPE'},delegate);
			$('#leftNavButton_4').click({mode:'LIGHTING'},delegate);
			$('#leftNavButton_5').click({mode:'DAYLIGHTING'},delegate);
			
		},
		
		onClick : function(event) {
			
			//var newEvent = jQuery.Event('SWITCH_MODE');
			//newEvent.mode = event.data.mode;
	
			//$(lgb.view.gui).trigger(newEvent);
			
			this.dispatch(lgb.event.Event.SWITCH_MODE, event.data.mode);
			
		}
		
	};

	lgb.view.LeftNavView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











