goog.provide('lgb.events.Object3DSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when an object is selcted in the world
 * @param {THREE.MeshCollider}  meshCollider
 * @extends {goog.events.Event}
 */
lgb.events.Object3DSelected = function(meshCollider) {

	goog.events.Event.call(this, lgb.events.Object3DSelected.TYPE);

	//this.payload = {};

 /**@type {THREE.MeshCollider} **/
  this.payload = meshCollider;

};
goog.inherits(lgb.events.Object3DSelected, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.Object3DSelected.TYPE = 'lgb.events.Object3DSelected';