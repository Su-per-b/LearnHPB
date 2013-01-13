/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 * Stores configuration information for the
 * app.
 * information about the datatypes used is here:
 * http://code.google.com/closure/compiler/docs/js-for-compiler.html
 */

goog.provide('sim.Config');

/**@typedef {Object} */
sim.Config = {};

/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in sim.events.EventBus.
 */
sim.Config.DEBUG_EVENTS = false;

/**
 * relative path to 3d assets includinf Three.js meshes and textures.
 * @const
 * @type {string}
 */
sim.Config.ASSETS_BASE_PATH = '3d-assets/';

/**
 * relative path to all XML files.
 * @const
 * @type {string}
 */
sim.Config.XML_BASE_PATH = 'xml/';

/**
 * Will apear in the <title>.
 * @const
 * @type {string}
 */
sim.Config.APP_TITLE = 'Learn High Performance Buildings';

/**
 * The application verison, will appear in the <title>
 * @const
 * @type {string}
 */
sim.Config.APP_VERSION = 'Alph 0.5.0';

/**
 * Will show status in the upper left if set to true.
 * @const
 * @type {boolean}
 */
sim.Config.SHOW_STATS = true;

/**
 * The file that holds the Three.js scene for all the particle systems.
 * @const
 * @type {string}
 */
sim.Config.PARTICLE_SYSTEM_SCENE = sim.Config.ASSETS_BASE_PATH +
'particle-systems/ps9.json';

/**
 * the XML file for all the particle systems.
 * @const
 * @type {string}
 */
sim.Config.PARTICLE_SYSTEM_XML = sim.Config.XML_BASE_PATH +
'ps9.xml';

/**
 * @return {string} The string used to inject into the <title>
 * tag in the DOM.
 */
sim.Config.getTitle = function() {
  var str = '{0} - v{1}'.format(sim.Config.APP_TITLE, sim.Config.APP_VERSION);
  return str;
};


/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in sim.events.EventBus.
 */
sim.Config.UTILITY_SHOW_GRID = true;

/**
 * @define {boolean} If this is set to true, then all global events
 * are logged in sim.events.EventBus.
 */
sim.Config.UTILITY_SHOW_AXIS = false;



