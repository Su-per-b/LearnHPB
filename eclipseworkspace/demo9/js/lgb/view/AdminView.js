
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
		this.title = "Admin.";
		
	};
	
	lgb.view.AdminView.prototype = {
	
	

		processOne : function(dataModel) {
			dataModel.assertType(lgb.model.ModelBase);
			
			var subpanel = new lgb.view.AdminSubpanel2(dataModel, this.htmlID);
			this.subPanels.push(subpanel);
		},
		
		
		injectHtml : function() {
			
			//var el = $('body');
			
			var html = 	'<div id="{0}" title="{1}">\
			</div>'.format(this.htmlID, this.title);
		
			//el.append(htmlBoilerplate);
			
			this.append(html);
			
			
			// Dialog	
			var selector = $('#{0}'.format(this.htmlID));
			
			selector.dialog({
				autoOpen: true,
				width: 400
			});
			
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











