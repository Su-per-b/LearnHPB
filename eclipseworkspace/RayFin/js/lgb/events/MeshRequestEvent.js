goog.provide('lgb.events.MeshRequestEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 *
 *  Event fired when a collada file is loaded
 * @param {THREE.Mesh} mesh
 * @param {Function} callback
 *
 * @extends {goog.events.Event}
 */
lgb.events.MeshRequestEvent = function(mesh, callback) {

	goog.events.Event.call(this, lgb.events.MeshRequestEvent.TYPE);

	this.payload = {};
	this.callback = callback;

	  /**
	   * The event payload
	   * @type {Object}
	   */
	  this.payload.mesh = mesh;

};
goog.inherits(lgb.events.MeshRequestEvent, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.events.MeshRequestEvent.TYPE =
    goog.events.getUniqueId('MeshRequestEvent');


