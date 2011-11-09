/**
 * @author Raj Dye - raj.dye@gmail.com
 * Stores configuration information for the
 * app.
 */

goog.provide('lgb.Config');

/**@typedef {Object} */
lgb.Config = {};

/**@const */
lgb.Config.DEBUG_EVENTS = false;

/**@const */
lgb.Config.ASSETS_BASE_PATH = '3d-assets/';

/**@const */
lgb.Config.XML_BASE_PATH = 'xml/';

/**@const */
lgb.Config.APP_TITLE = 'Learn Grean Buildings - Demo';

/**@const */
lgb.Config.APP_VERSION = '0.10.02';

/**@const */
lgb.Config.SHOW_STATS = false;

/**@const */
lgb.Config.PARTICLE_SYSTEM_SCENE = lgb.Config.ASSETS_BASE_PATH +
'particle-systems/ps7.js';

/**@const */
lgb.Config.PARTICLE_SYSTEM_XML = lgb.Config.XML_BASE_PATH +
'ps7.xml';

/**
 * @return {string} The string used to inject into the <title>
 * tag in the DOM.
 */
lgb.Config.getTitle = function() {
  var str = '{0} - v{1}'.format(lgb.Config.APP_TITLE, lgb.Config.APP_VERSION);
  return str;
};







