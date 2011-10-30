
o3djs.require('lgb.view.AdminSubpanel');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};


	lgb.view.AdminPanel = function(){
		
		this.subPanels = new Array();
	
	};
	
	lgb.view.AdminPanel.prototype = {
	
		makeSubpanel : function(model,clickHandler) {
			
			var subpanel = new lgb.view.AdminSubpanel(model);
			$(subpanel).bind("ADMIN_PANEL",clickHandler);
			
			this.subPanels.push(subpanel);

		},
			
		injectHtml : function() {
			
			var el = $('body');
			var htmlBoilerplate = '<div id="adminPanel" class="panel">\n' +
								'\t<h3>Admin</h3>\n' +
								'\t<div class="box">\n' +
									'\t\t</div>\n' +
								'\t</div>\n';
			
			el.append(htmlBoilerplate);
			
			$('#adminPanel').panel({
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

	
	return lgb;
	
})(lgb || {});











