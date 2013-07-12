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
lgb.Config.APP_TITLE = 'LearnHPB Demo';

/**
 * The application verison, will appear in the <title>
 * @const
 * @type {string}
 */
lgb.Config.APP_VERSION = '12.46';

/**
 * Will show status in the upper left if set to true.
 * @const
 * @type {boolean}
 */
lgb.Config.SHOW_STATS = true;


lgb.Config.HUD_CONTAINER = "#webGLcanvas";
lgb.Config.HUD_CONTAINER_STR = "webGLcanvas";

/**
 * The file that holds the Three.js scene for all the particle systems.
 * @const
 * @type {string}
 */
lgb.Config.PARTICLE_SYSTEM_SCENE = lgb.Config.ASSETS_BASE_PATH +
'particle-systems/scene.json';


/**
 * the XML file for all the particle systems.
 * @const
 * @type {string}
 */
lgb.Config.PARTICLE_SYSTEM_XML = lgb.Config.XML_BASE_PATH +
'scene.xml';

/**
 * @return {string} The string used to inject into the <title>
 * tag in the DOM.
 */
lgb.Config.getTitle = function() {
  var str = '{0} - version {1}'.format(lgb.Config.APP_TITLE, lgb.Config.APP_VERSION);
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


lgb.Config.LAYOUT_ID = function() {};

lgb.Config.LAYOUT_ID.TitleBar = 0;
lgb.Config.LAYOUT_ID.TopMenu = 1;
lgb.Config.LAYOUT_ID.ViewPoints = 2;
lgb.Config.LAYOUT_ID.Visibility = 3;
lgb.Config.LAYOUT_ID.Airflow = 4;
lgb.Config.LAYOUT_ID.PropertiesButton = 5;
lgb.Config.LAYOUT_ID.PropertiesView = 6;
lgb.Config.LAYOUT_ID.TestingInputGUI = 7;
lgb.Config.LAYOUT_ID.SimulationButton = 8;
lgb.Config.LAYOUT_ID.SimulationView = 9;
lgb.Config.LAYOUT_ID.BuildingInputGUI = 10;
lgb.Config.LAYOUT_ID.BaseGUI = 11;
lgb.Config.LAYOUT_ID.MainInputGUI = 12;
lgb.Config.LAYOUT_ID.RightTopInputGUI = 13;



