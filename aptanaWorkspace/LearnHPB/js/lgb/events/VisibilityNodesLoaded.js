/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.VisibilityNodesLoaded');

goog.require('lgb.model.vo.VisibilityNode');
goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.model.ViewPointCollection  obj The 3D object to make into a viewpoint.
 * @extends {goog.events.Event}
 */
lgb.events.VisibilityNodesLoaded = function(visibilityNodeRoot) {

  goog.events.Event.call(this, lgb.events.VisibilityNodesLoaded.TYPE);

 /**@type {THREE.Object3D} **/
  this.payload = visibilityNodeRoot;

};
goog.inherits(lgb.events.VisibilityNodesLoaded, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.VisibilityNodesLoaded.TYPE = 'lgb.events.VisibilityNodesLoaded';
