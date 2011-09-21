	/**
 * @namespace 
 */
var lgb = (function(lgb) {


	
	lgb.Config = function() {

	};
	
	lgb.Config.DEBUG_EVENTS = true;
	lgb.Config.ASSETS_BASE_PATH = '3d-assets/';
	lgb.Config.XML_BASE_PATH = 'xml/';
	lgb.Config.APP_TITLE = "Learn Grean Buildings - Demo 10";
	lgb.Config.APP_VERSION = '0.010.00';
	lgb.Config.BACKGROUND_COLOR = [0.7, 0.8, 1, 1];
	
	
	lgb.Config.getTitle = function() {
	
		var str = '{0} - v{1}'.format(lgb.Config.APP_TITLE, lgb.Config.APP_VERSION );
		return str;
		
	};
	
	
	return lgb;
	
	
})(lgb || {});
	
	
	
	
	