/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.CamerasLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {THREE.Camera} camera The camera loaded from a file.
 * @extends {goog.events.Event}
 */
lgb.events.CamerasLoaded = function(camera) {
 
  goog.events.Event.call(this, lgb.events.CamerasLoaded.TYPE);



  /**
   * The event payload
   * @type {THREE.Camera}
   */
   this.payload = camera;

};
goog.inherits(lgb.events.CamerasLoaded, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.CamerasLoaded.TYPE = 'lgb.events.CamerasLoaded';
