o3djs.require('lgb.view.component.Button');
o3djs.require('lgb.view.component.Link');
o3djs.require('lgb.view.component.Slider');
o3djs.require('lgb.view.component.RadioButtonGroup');
o3djs.require('lgb.model.component.SelectionItem');
o3djs.require('lgb.model.component.SelectionGroup');

/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};


	lgb.view.AdminSubpanel = function( dataModel ) {
		lgb.view.ViewBase.call(this);
		this.name = dataModel.name;
		this.title = dataModel.title;
		this.userActions = dataModel.userActions;
		this.componentControllers = [];
		this.init_();
	};
	
	lgb.view.AdminSubpanel.prototype = {
	
		/*
		 * for this subpanel, loop through all the available
		 * user actions and create the appropriate component
		 */
		init_ : function() {
			
			var len = this.userActions.length;
			for(var x = 0; x < len; x++) {
				var uAct =  this.userActions[x];
				var componentController = null;
			
				if (uAct instanceof lgb.model.component.SelectionGroup) {
					componentController = new lgb.controller.component.RadioButtonGroupController(uAct);
				}
				 
				this.componentControllers.push(componentController);
			}

		},
				
		
		
		getActionsHTML_ : function() {
			
			var actionsHTML = '';
			
			var len = this.componentControllers.length;
			for(var x = 0; x < len; x++) {
				var componentController =  this.componentControllers[x];
				actionsHTML += componentController.getHTML() + '<br />';
			}
			
			return actionsHTML;
			
		},
		

		
		injectHtml : function() {
			
			var actionsHtml = this.getActionsHTML_();
			
			var selector = '#{0}'.format(this.name);
			var group = 'group_{0}'.format(this.name);
			
			el = $('div.box');
			var html = '<div id="{0}" class="panel {1}">\n'.format(this.name, group) +
							'\t<h3>{0}</h3>\n'.format(this.title) +
							'\t<div>\n' + 
								actionsHtml +
							'\t</div>\n' +
						'</div>';
			
			el.append(html);
			
	        $(selector).panel({
	            accordion:group
	        });
			
			this.bindEvents();
			
		},
		bindEvents : function() {

			var len = this.componentControllers.length;
			
			for(var x = 0; x < len; x++) {
				var controller = this.componentControllers[x];
				controller.bindEvents();
			}
			
		}


	};

	lgb.view.AdminSubpanel.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











