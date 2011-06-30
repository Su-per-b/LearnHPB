
/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};


	lgb.view.AdminSubpanel2 = function( dataModel, parentHTMLid ) {
		
		lgb.view.ViewBase.call(this);
		
		this.parentHTMLid = parentHTMLid;
		this.htmlID = dataModel.name;
		this.title = dataModel.title;
		this.userActions = dataModel.userActions;
		this.componentControllers = [];
		this.init_();
	};
	
	lgb.view.AdminSubpanel2.prototype = {
	
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
				} else if (uAct instanceof lgb.model.component.Tigger) {
					componentController = new lgb.controller.component.ButtonController(uAct);
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
			
			el = $('#{0}'.format(this.parentHTMLid));
			
			var html = '<div id="{0}">\n'.format(this.htmlID) +
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

	lgb.view.AdminSubpanel2.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











