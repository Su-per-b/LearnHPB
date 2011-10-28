goog.provide('lgb.events.MeshLoadedEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {THREE.Mesh}  mesh
 * @extends {goog.events.Event}
 */
lgb.events.MeshLoadedEvent = function(mesh) {

	goog.events.Event.call(this, lgb.events.MeshLoadedEvent.TYPE);

	//this.payload = {};

 /**@type {THREE.Mesh} **/
  this.payload = mesh;

};
goog.inherits(lgb.events.MeshLoadedEvent, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.events.MeshLoadedEvent.TYPE =
    goog.events.getUniqueId('MeshLoadedEvent');


