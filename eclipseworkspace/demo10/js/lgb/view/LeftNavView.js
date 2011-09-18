
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
			this.injectHtml();
		//	this.bindEvents();
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
				'\t<a id="leftNavButton_4" class="leftNavButton" title="Lighting" href="#"></a>\n' +
				'\t<a id="leftNavButton_5" class="leftNavButton" title="Day Lighting" href="#"></a>\n' +
			'</div>';
	
			 this.append(html);
			
		},
		
		bindEvents : function() {

			var delegate = this.d(this.onClick);
			
			$('#leftNavButton_1').click({mode:lgb.model.VisibilityTag.ALL},delegate);
			$('#leftNavButton_2').click({mode:lgb.model.VisibilityTag.HVAC},delegate);
			$('#leftNavButton_3').click({mode:lgb.model.VisibilityTag.ENVELOPE},delegate);
			//$('#leftNavButton_4').click({mode:'LIGHTING'},delegate);
		//	$('#leftNavButton_5').click({mode:'DAYLIGHTING'},delegate);
			
		},
		
		onClick : function(event) {

			this.dispatch(lgb.event.Visibility.GUI_SELECTION, event.data.mode);
		}
		
	};

	lgb.view.LeftNavView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











