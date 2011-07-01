
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
		
		init : function() {
			this.injectHtml();
			//this.bindEvents();

						
			//var parent = this.getSelector().parent();
			//var parent2 = parent.parent();
			
			
		//	this.floatingObj = floatingMenu.add('ffff', {targetRight: 0});
			 
		},
		show : function() {
			//this.floatingObj.targetRight = 100;

			var selector = this.getSelector();
			selector.dialog( "open" );
			selector.dialog("widget").show("slide", { direction: "right", easing : "swing" }, 1000);
			
			
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
				position: 'right',
				autoOpen: false
			});
			
			
			//getter
			//var show = selector.dialog( "option", "show" );
			//setter
			//selector.dialog( "option", "show", 'slide' );


			//selector.parent().show("slide", { direction: "left" }, 1000);
			
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











