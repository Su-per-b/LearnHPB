
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Admin View
	 * it handles the life-cycle of the subpanels, 
	 * and the various AJAX components
	 */
	lgb.view.DialogView = function(dataModel){

		lgb.view.ViewBase.call(this, dataModel);
		this.subPanels = [];

		
	};
	
	lgb.view.DialogView.prototype = {
		init : function() {
			this.injectHtml();	 
		},
		toggleVisible : function() {

			if (this.isOpen()) {
				this.hide();
			}
			else {
				this.show();
			}
		},
		isOpen : function() {
			var selector = this.getSelector();
			//var widget = selector.dialog("isOpen");
			
			return selector.dialog("isOpen");
		},
		show : function(slideFlag) {
			

			var selector = this.getSelector();
			
			if (!this.isOpen()) {
				selector.dialog("open");
			
				if (slideFlag) {
					selector.dialog("widget").show("slide", {
						direction: "right",
						easing: "swing"
					}, 1000);
				}
			}
		},
		hide : function() {
			this.getSelector().dialog("close");
		},
		onCloseButtonClicked : function(event) {
			this.dispatch(this.closedEventStr );
		}
	};

	lgb.view.DialogView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











