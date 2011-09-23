goog.provide('lgb.event.MeshLoadedEvent');

goog.require('goog.events.Event');

/**
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.MeshLoadedEvent = function(mesh) {
	
	goog.events.Event.call(this, lgb.event.MeshLoadedEvent.TYPE);

	//this.payload = {};
	
  /**
   * The event payload
   * @type {Object}
   */
  this.payload = mesh;

};

goog.inherits(lgb.event.MeshLoadedEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.MeshLoadedEvent.TYPE =
    goog.events.getUniqueId('MeshLoadedEvent');
    

