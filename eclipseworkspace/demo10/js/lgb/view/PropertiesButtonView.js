
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.PropertiesButtonView = function(){
		lgb.view.component.ToggleButton.call(this, "propertiesButtonLink", -33, 33);
		this.htmlID = "propertiesButton";
	};
	
	lgb.view.PropertiesButtonView.prototype = {
	
			
		init : function() {
			this.attachCSS();
			this.injectHtml();
			this.bindEvents();
			this.initMenu({targetTop: 4,targetRight: -33});
			this.isSelected = false;
			$('#propertiesButtonLink').addClass("selected");
		},
			
		show : function() {
			this.floatingObj.targetRight = 41;
			
		},
			
		injectHtml : function() {

			var html = '<div id="propertiesButton">\
						<a id="propertiesButtonLink" title="Show / Hide Properties panel" href="#"></a>\
						</div>';


			 this.append(html);
			
		},
		toggleVisible : function() {
			this.setSelected(!this.isSelected);
		},
		setSelected : function(isSelected) {
			
			this.isSelected = isSelected;
			
			if (this.isSelected) {
				$('#propertiesButtonLink').addClass("selected");
			} else {
				$('#propertiesButtonLink').removeClass("selected");
			}

		},
		bindEvents : function() {

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

		},
		
		onClick : function(event) {
			this.dispatch(lgb.event.Event.TOGGLE_PROPERTIES_PANEL);
		}
		
	};

	lgb.view.PropertiesButtonView.inheritsFrom(lgb.view.component.ToggleButton);

	return lgb;
	
})(lgb || {});











