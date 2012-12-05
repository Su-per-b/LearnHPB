/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 * Stores configuration information for the
 * app.
 * information about the datatypes used is here:
 * http://code.google.com/closure/compiler/docs/js-for-compiler.html
 */

goog.provide('lgb.Config');

/**@typedef {Object} */
lgb.Config = {};

/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in lgb.events.EventBus.
 */
lgb.Config.DEBUG_EVENTS = false;

/**
 * relative path to 3d assets includinf Three.js meshes and textures.
 * @const
 * @type {string}
 */
lgb.Config.ASSETS_BASE_PATH = '3d-assets/';

/**
 * relative path to all XML files.
 * @const
 * @type {string}
 */
lgb.Config.XML_BASE_PATH = 'xml/';

/**
 * Will apear in the <title>.
 * @const
 * @type {string}
 */
lgb.Config.APP_TITLE = 'Learn Grean Buildings - Demo';

/**
 * The application verison, will appear in the <title>
 * @const
 * @type {string}
 */
lgb.Config.APP_VERSION = '0.11.03';

/**
 * Will show status in the upper left if set to true.
 * @const
 * @type {boolean}
 */
lgb.Config.SHOW_STATS = true;

/**
 * The file that holds the Three.js scene for all the particle systems.
 * @const
 * @type {string}
 */
lgb.Config.PARTICLE_SYSTEM_SCENE = lgb.Config.ASSETS_BASE_PATH +
'particle-systems/ps9.json';

/**
 * the XML file for all the particle systems.
 * @const
 * @type {string}
 */
lgb.Config.PARTICLE_SYSTEM_XML = lgb.Config.XML_BASE_PATH +
'ps9.xml';

/**
 * @return {string} The string used to inject into the <title>
 * tag in the DOM.
 */
lgb.Config.getTitle = function() {
  var str = '{0} - v{1}'.format(lgb.Config.APP_TITLE, lgb.Config.APP_VERSION);
  return str;
};


/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in lgb.events.EventBus.
 */
lgb.Config.UTILITY_SHOW_GRID = true;

/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in lgb.events.EventBus.
 */
lgb.Config.UTILITY_SHOW_AXIS = false;



