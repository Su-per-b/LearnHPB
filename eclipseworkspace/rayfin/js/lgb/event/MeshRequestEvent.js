goog.provide('lgb.event.MeshRequestEvent');

goog.require('goog.events.Event');

/**
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.MeshRequestEvent = function(mesh, callback) {
	
	goog.events.Event.call(this, lgb.event.MeshRequestEvent.TYPE);

	this.payload = {};
	this.callback = callback;
	
  /**
   * The event payload
   * @type {Object}
   */
  this.payload.mesh = mesh;

};

goog.inherits(lgb.event.MeshRequestEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.MeshRequestEvent.TYPE =
    goog.events.getUniqueId('MeshRequestEvent');
    

