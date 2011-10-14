
/**
 * @namespace
 */
var lgb = (function(lgb) {


	/**
	 * @namespace
	 */
	lgb.view = lgb.view || {};


	lgb.view.PropertiesSubpanel = function( dataModel, parentHTMLid ) {
		
		lgb.view.ViewBase.call(this);
		
		this.parentHTMLid = parentHTMLid;
		this.htmlID = dataModel.name;
		this.title = dataModel.title;
		this.init_();
	};
	
	lgb.view.PropertiesSubpanel.prototype = {
	
		/*
		 * for this subpanel, loop through all the available
		 * user actions and create the appropriate component
		 */
		init_ : function() {
			


		},

		injectHtml : function() {
			
			var actionsHtml = this.getActionsHTML_();
			
			
			var html = '<div id="{0}" class="propertiesSubPanel">\n\
							\t<h3>{1}</h3>\n\
							\t<div >\n\{2}\t</div>\n\
						</div>'.format(this.htmlID, this.title, 'test');
			
			
			this.append(html);

		},
		



	};

	lgb.view.PropertiesSubpanel.inheritsFrom(lgb.view.ViewBase);

	return lgb;
	
})(lgb || {});











