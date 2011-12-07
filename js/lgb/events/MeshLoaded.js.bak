goog.provide('lgb.events.MeshLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {THREE.Mesh}  mesh
 * @extends {goog.events.Event}
 */
lgb.events.MeshLoaded = function(mesh) {

	goog.events.Event.call(this, lgb.events.MeshLoaded.TYPE);

	//this.payload = {};

 /**@type {THREE.Mesh} **/
  this.payload = mesh;

};
goog.inherits(lgb.events.MeshLoaded, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.MeshLoaded.TYPE = 'lgb.events.MeshLoaded';