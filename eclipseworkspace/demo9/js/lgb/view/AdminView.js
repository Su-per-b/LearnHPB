
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
	lgb.view.AdminView = function(){
		lgb.view.ViewBase.call(this);
		
		this.subPanels = [];
		this.htmlID = "adminView";
		this.title = "Admin";
		
	};
	
	lgb.view.AdminView.prototype = {
	
	

		processOne : function(dataModel) {
			dataModel.assertType(lgb.model.ModelBase);
			
			var subpanel = new lgb.view.AdminSubpanel(dataModel, this.htmlID);
			this.subPanels.push(subpanel);
		},
		
		isOpen : function() {
			var selector = this.getSelector();
			//var widget = selector.dialog("isOpen");
			
			return selector.dialog("isOpen");
		},
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
		
		injectHtml : function() {
			
			
			var html = 	'<div id="{0}" title="{1}">\
			</div>'.format(this.htmlID, this.title);
			
			this.append(html);
			
			var selector = this.getSelector();
			
			selector.direction = 'left';
			
			selector.dialog({
				hide: 'fade',
				width: 300,
				height: 580,
				position: 'right',
				autoOpen: false
			});
;
			
			var len = this.subPanels.length;
			for(var x = 0; x < len; x++) {
				var subPanel = this.subPanels[x];
				subPanel.injectHtml();
			}
			
		}
	};

	lgb.view.AdminView.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











