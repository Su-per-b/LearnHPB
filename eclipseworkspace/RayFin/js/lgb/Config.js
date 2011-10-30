goog.provide('lgb.Config');

/**
 * @namespace
 */
//console.log("loaded Config");

	lgb.Config = function() {

	};

	lgb.Config.DEBUG_EVENTS = true;
	lgb.Config.ASSETS_BASE_PATH = '3d-assets/';
	lgb.Config.XML_BASE_PATH = 'xml/';
	lgb.Config.APP_TITLE = 'Learn Grean Buildings';
	lgb.Config.APP_VERSION = '0.00.12';
	lgb.Config.SHOW_STATS = false;


	lgb.Config.getTitle = function() {
		var str = '{0} - v{1}'.format(lgb.Config.APP_TITLE, lgb.Config.APP_VERSION);
		return str;
	};






