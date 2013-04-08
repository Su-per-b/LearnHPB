/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.ViewPointLoaded');
goog.require('lgb.model.ViewPointNode');
goog.require('goog.events.Event');

/**
 * @constructor
 * @param {THREE.Object3D}  obj The 3D object to make into a viewpoint.
 * @extends {goog.events.Event}
 */
lgb.events.ViewPointLoaded = function(viewPointNode) {

  goog.events.Event.call(this, lgb.events.ViewPointLoaded.TYPE);

 /**@type {THREE.Object3D} **/
  this.payload = viewPointNode;

};
goog.inherits(lgb.events.ViewPointLoaded, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.ViewPointLoaded.TYPE = 'lgb.events.ViewPointLoaded';
