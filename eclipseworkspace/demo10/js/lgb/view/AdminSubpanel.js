
/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};


	lgb.view.AdminSubpanel = function( dataModel, parentHTMLid ) {
		
		lgb.view.ViewBase.call(this);
		
		this.parentHTMLid = parentHTMLid;
		this.htmlID = dataModel.name;
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

				var componentController = new lgb.controller.GuiComponentController(uAct);
				this.componentControllers.push(componentController);
			}

		},
				
		
		
		getActionsHTML_ : function() {
			
			var actionsHTML = '';
			
			var len = this.componentControllers.length;
			for(var x = 0; x < len; x++) {
				var componentController =  this.componentControllers[x];
				actionsHTML += componentController.getHTML();
			}
			
			return actionsHTML;
			
		},
		

		
		injectHtml : function() {
			
			var actionsHtml = this.getActionsHTML_();
			
			
			var html = '<div id="{0}" class="adminSubPanel">\n\
							\t<h3>{1}</h3>\n\
							\t<div class="actions">\n\{2}\t</div>\n\
						</div>'.format(this.htmlID, this.title, actionsHtml);
			
			
			this.append(html);
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










