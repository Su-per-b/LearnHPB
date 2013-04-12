/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.ViewPointListLoaded');
goog.require('lgb.model.ViewPointNode');
goog.require('goog.events.Event');

/**
 * @constructor
 * @param {THREE.Object3D}  obj The 3D object to make into a viewpoint.
 * @extends {goog.events.Event}
 */
lgb.events.ViewPointListLoaded = function(viewPointNode) {

  goog.events.Event.call(this, lgb.events.ViewPointListLoaded.TYPE);

 /**@type {THREE.Object3D} **/
  this.payload = viewPointNode;

};
goog.inherits(lgb.events.ViewPointListLoaded, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.ViewPointListLoaded.TYPE = 'lgb.events.ViewPointListLoaded';
