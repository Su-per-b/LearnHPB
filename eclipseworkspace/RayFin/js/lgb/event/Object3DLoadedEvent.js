goog.provide('lgb.event.Object3DLoadedEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {Object3D} 
 * @extends {goog.events.Event}
 */
lgb.event.Object3DLoadedEvent = function(obj) {
	
	goog.events.Event.call(this, lgb.event.Object3DLoadedEvent.TYPE);

	//this.payload = {};
	

  this.payload = obj;

};

goog.inherits(lgb.event.Object3DLoadedEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.Object3DLoadedEvent.TYPE =
    goog.events.getUniqueId('Object3DLoadedEvent');
    

