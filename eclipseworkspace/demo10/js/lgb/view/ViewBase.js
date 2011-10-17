
/**
 * @namespace 
 */
var lgb = (function(lgb) {


	lgb.view = lgb.view || {};
	
	lgb.view.ViewBase = function(dataModel) {
		lgb.Base.call(this);
		
		if (null !== dataModel && undefined !== dataModel) {
			this.dataModel = dataModel;
			this.listenForChange();
		}
		
		this.parentHTMLid = "theBody";
		this.htmlID = null;
		this.floatingObj = null;
	};
	
	

	lgb.view.ViewBase.prototype = {
		
		append : function(html) {
			this.getParentSelector().append(html);
		},
		getSelector : function(id) {
			
			if (lgb.isNull(id)) {
				id = this.htmlID;
			}
			
			var selector = $('#{0}'.format(id));
			return selector;
		},

		getParentSelector : function() {
			
			var selector = $('#{0}'.format(this.parentHTMLid));
			return selector;
		},
		
		listenForChange : function() {
			
			var delegate = jQuery.proxy( this.onChange, this );
			$(this.dataModel).bind(lgb.event.Event.DATA_MODEL_CHANGED, delegate);
			
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


