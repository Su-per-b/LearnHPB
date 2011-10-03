
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
		lgb.view.DialogView.call(this);
		
		this.subPanels = [];
		this.htmlID = "adminView";
		this.title = "Admin";
		this.closedEventStr  = lgb.event.Event.CLOSED_ADMIN_PANEL;
		
	};
	
	lgb.view.AdminView.prototype = {
	
	
		processOne : function(dataModel) {
			dataModel.assertType(lgb.model.ModelBase);
			
			var subpanel = new lgb.view.AdminSubpanel(dataModel, this.htmlID);
			this.subPanels.push(subpanel);
		},
		

		injectHtml : function() {
			
			
			
			var html = 	'<div id="{0}">\
			</div>'.format(this.htmlID);
			
			this.append(html);
			
			var selector = this.getSelector();
			
			selector.direction = 'left';
			
			selector.dialog ({
				title: this.title,
				dialogClass: this.htmlID + '-dialog',
				hide: 'fade',
				width: 300,
				height: 580,
				position: 'right',
				autoOpen: false
			});
			
			


			selector.bind("dialogclose", this.d(this.onCloseButtonClicked));
			
			var len = this.subPanels.length;
			for(var x = 0; x < len; x++) {
				var subPanel = this.subPanels[x];
				subPanel.injectHtml();
			}
			
		}
	};

	lgb.view.AdminView.inheritsFrom(lgb.view.DialogView);

	return lgb;
	
})(lgb || {});











