	/**
 * @namespace 
 */
var lgb = (function(lgb) {


	
	lgb.Config = function() {

	};
	
	lgb.Config.DEBUG_EVENTS = true;
	lgb.Config.ASSETS_PATH = '3d_assets/';
	lgb.Config.APP_TITLE = "Learn Grean Buildings - Demo 9";
	lgb.Config.APP_VERSION = '0.09.03';
	lgb.Config.BACKGROUND_COLOR = [0.7, 0.8, 1, 1];
	
	
	lgb.Config.getTitle = function() {
	
		var str = '{0} - v{1}'.format(lgb.Config.APP_TITLE, lgb.Config.APP_VERSION );
		return str;
		
	};
	
	
	return lgb;
	
	
})(lgb || {});
	
	
	
	
	
