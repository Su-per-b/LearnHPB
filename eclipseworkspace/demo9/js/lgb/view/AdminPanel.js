
/**
 * @namespace
 */
var lgb = (function(lgb) {



	lgb.view = lgb.view || {};

	/**
	 * @class this is the MVC view class for the Admin Panel
	 * it handles the life-cycle of the subpanels, 
	 * and the various AJAX components
	 */
	lgb.view.AdminPanel = function(){
		lgb.view.ViewBase.call(this);
		this.subPanels = [];
		this.htmlID = "adminPanel";
		
	
	};
	
	lgb.view.AdminPanel.prototype = {
	
	

		processOne : function(dataModel) {
			dataModel.assertType(lgb.model.ModelBase);
			
			var subpanel = new lgb.view.AdminSubpanel(dataModel, this.htmlID);
			this.subPanels.push(subpanel);
		},
		
		
		injectHtml : function() {
			
			var el = $('body');
			var htmlBoilerplate = '<div id="{0}" class="panel">\n'.format(this.htmlID) +
								'\t<h3>Admin</h3>\n' +
								'\t<div class="box">\n' +
									'\t\t</div>\n' +
								'\t</div>\n';
			
			el.append(htmlBoilerplate);
			
			$('#{0}'.format(this.htmlID)).panel({
				'collapseType':'slide-right',
                'stackable':false,
                'collapsed':true
			});
			
			
			var len = this.subPanels.length;
			for(var x = 0; x < len; x++) {
				var subPanel = this.subPanels[x];
				subPanel.injectHtml();
			}
		}
	};

	lgb.view.AdminPanel.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











