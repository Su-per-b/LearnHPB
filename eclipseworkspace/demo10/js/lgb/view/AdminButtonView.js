
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Left Nav
	 */
	lgb.view.AdminButtonView = function(){
		lgb.view.ViewBase.call(this);
		this.htmlID = "adminButton";

	};
	
	lgb.view.AdminButtonView.prototype = {
	
			
		init : function() {
			this.injectHtml();
			this.bindEvents();
			this.initMenu({targetTop: 4,targetRight: -34});
			this.isSelected = true;
			$('#adminButtonLink').addClass("selected");
		},
			
		show : function() {
			this.floatingObj.targetRight = 4;
			
		},
			
		injectHtml : function() {

			var html = '<div id="adminButton">\
						<a id="adminButtonLink" title="Show / hide Admin panel" href="#"></a>\
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

			$('#adminButtonLink').click({mode:'ALL'},this.d(this.onClick));

			var toolTipConfig = {
			  skin: 'light',
				hook: {
				  target: 'leftmiddle',
				  tooltip: 'rightmiddle'
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

	lgb.view.AdminButtonView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











