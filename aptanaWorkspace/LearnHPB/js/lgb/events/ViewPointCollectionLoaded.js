/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.ViewPointCollectionLoaded');

goog.require('lgb.model.ViewPointCollection');
goog.require('lgb.model.ViewPointNode');
goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.model.ViewPointCollection  obj The 3D object to make into a viewpoint.
 * @extends {goog.events.Event}
 */
lgb.events.ViewPointCollectionLoaded = function(viewPointNodeCollection) {

  goog.events.Event.call(this, lgb.events.ViewPointCollectionLoaded.TYPE);

 /**@type {THREE.Object3D} **/
  this.payload = viewPointNodeCollection;

};
goog.inherits(lgb.events.ViewPointCollectionLoaded, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.ViewPointCollectionLoaded.TYPE = 'lgb.events.ViewPointCollectionLoaded';
