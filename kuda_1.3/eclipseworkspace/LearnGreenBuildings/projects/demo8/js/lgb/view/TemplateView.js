


/**
 * @namespace A module for managing the 2D GUI
 */
var lgb = (function(lgb) {


	/**
	 * @namespace A module for managing the 2D GUI
	 */
	lgb.view = lgb.view || {};
	lgb.view.gui = lgb.view.gui || {};
	

	
	lgb.view.HvacDamperView = function(){
		
		var newEvent = jQuery.Event('SWITCH_MODE');
		newEvent.mode = event.data.mode;

		$(lgb.view.gui).trigger(newEvent);
	
	};
	
	lgb.view.HvacDamperView.prototype = {
	
		func1 : function(){
		
		
		},
		
		func2 : function() {
		
		
		}
		
	};

	
	return lgb;
	
})(lgb || {});











