/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 * Stores configuration information for the
 * app.
 * information about the datatypes used is here:
 * http://code.google.com/closure/compiler/docs/js-for-compiler.html
 */

goog.provide('lgb.core.Config');

/**@typedef {Object} */
lgb.core.Config = {};

/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in lgb.core.EventBus.
 */
lgb.core.Config.DEBUG_EVENTS = false;


lgb.core.Config.DEBUG_3D = false;



/**
 * relative path to 3d assets includinf Three.js meshes and textures.
 * @const
 * @type {string}
 */
lgb.core.Config.ASSETS_BASE_PATH = '3d-assets/';

/**
 * relative path to all XML files.
 * @const
 * @type {string}
 */
lgb.core.Config.XML_BASE_PATH = 'xml/';

/**
 * Will apear in the <title>.
 * @const
 * @type {string}
 */
lgb.core.Config.APP_TITLE = 'LearnHPB Beta';

/**
 * The application verison, will appear in the <title>
 * @const
 * @type {string}
 */
lgb.core.Config.APP_VERSION = '1.51';

/**
 * Will show status in the upper left if set to true.
 * @const
 * @type {boolean}
 */
lgb.core.Config.SHOW_STATS = true;


lgb.core.Config.WEBGL_CONTAINER_DIV_ID = "webGLcontainerDiv";

/**
 * The file that holds the Three.js scene for all the particle systems.
 * @const
 * @type {string}
 */
lgb.core.Config.PARTICLE_SYSTEM_SCENE = lgb.core.Config.ASSETS_BASE_PATH +
'particle-systems/scene.json';


/**
 * the XML file for all the particle systems.
 * @const
 * @type {string}
 */
lgb.core.Config.PARTICLE_SYSTEM_XML = lgb.core.Config.XML_BASE_PATH +
'scene.xml';

/**
 * @return {string} The string used to inject into the <title>
 * tag in the DOM.
 */
lgb.core.Config.getTitle = function() {
  var str = '{0} - version {1}'.format(lgb.core.Config.APP_TITLE, lgb.core.Config.APP_VERSION);
  return str;
};


/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in lgb.core.EventBus.
 */
lgb.core.Config.UTILITY_SHOW_GRID = true;

/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in lgb.core.EventBus.
 */
lgb.core.Config.UTILITY_SHOW_AXIS = false;

lgb.core.Config.SOCKET_SERVER = function() {};
lgb.core.Config.SOCKET_SERVER.AutoConfig = 0;
lgb.core.Config.SOCKET_SERVER.Pfalco = 1;
lgb.core.Config.SOCKET_SERVER.PfalcoLocal = 2;
lgb.core.Config.SOCKET_SERVER.LocalHost = 3;
lgb.core.Config.SOCKET_SERVER.Cube = 4;

lgb.core.Config.SOCKET_SERVER_HOST = lgb.core.Config.SOCKET_SERVER.AutoConfig;


lgb.core.Config.WEBROOT = "";

lgb.core.Config.SHOW_POPUPS = false;

