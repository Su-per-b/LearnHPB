
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.AdminButtonView = function(){
		lgb.view.component.ToggleButton.call(this, "adminButtonLink", 0, 33);
		this.htmlID = "adminButton";
					

	};
	
	lgb.view.AdminButtonView.prototype = {
	
			
		init : function() {
			
			this.attachCSS();
			
			this.injectHtml();
			this.bindEvents();
			this.initMenu({targetTop: 4,targetRight: -34});
			this.isSelected = false;
			

			
			//$('#adminButtonLink').addClass("selected");

			
		},
			
		show : function() {
			this.floatingObj.targetRight = 4;
			
		},
			
		injectHtml : function() {

			var html = '<div id="adminButton">\
						<a id="adminButtonLink" title="Show / Hide Admin panel" href="#"></a>\
						</div>';


			 this.append(html);
			
		},
		toggleVisible : function() {
			this.setSelected(!this.isSelected);
		},
		setSelected : function(isSelected) {
			
			this.isSelected = isSelected;
			
			if (this.isSelected) {
				$('#adminButtonLink').addClass("selected");
			} else {
				$('#adminButtonLink').removeClass("selected");
			}

		},
		bindEvents : function() {

			$('#adminButtonLink').click(this.d(this.onClick));

			
			var toolTipConfig = {
			  skin: 'light',
				hook: {
				  target: 'leftbottom',
				  tooltip: 'righttop'
				},
				background: { color: '#fff', opacity: .85 },
			  closeButton: false
			};
			
			Tipped.create('#adminButtonLink', toolTipConfig);

		},
		
		onClick : function(event) {
			this.dispatch(lgb.event.Event.TOGGLE_ADMIN_PANEL);
		}
		
	};

	lgb.view.AdminButtonView.inheritsFrom(lgb.view.component.ToggleButton);

	return lgb;
	
})(lgb || {});











