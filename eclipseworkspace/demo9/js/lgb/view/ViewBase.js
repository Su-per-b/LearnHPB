
/**
 * @namespace 
 */
var lgb = (function(lgb) {


	lgb.view = lgb.view || {};
	
	lgb.view.ViewBase = function() {
		lgb.Base.call(this);
		this.parentHTMLid = "theBody";
		this.htmlID = null;
		this.floatingObj = null;
	};

	lgb.view.ViewBase.prototype = {
		
		append : function(html) {
			this.getParentSelector().append(html);
		},
		getSelector : function() {
			
			var selector = $('#{0}'.format(this.htmlID));
			return selector;
		},
		getParentSelector : function() {
			
			var selector = $('#{0}'.format(this.parentHTMLid));
			return selector;
		},
        initMenu: function(floatingMenuConfig, element){
        
            floatingMenuConfig.snap = true;
			
			if (undefined === element || null === element) {
				element = document.getElementById(this.htmlID);
			}
			
            if (null === element) {
                throw new Error('GuiController.initMenu() id: {0} not found in HTML document'.format(id));
            }
            else {
                this.floatingObj = floatingMenu.add(this.htmlID, floatingMenuConfig);
            }
        }
		
	};
	
	lgb.view.ViewBase.inheritsFrom(lgb.Base);
	
	return lgb;
	
})(lgb || {});


