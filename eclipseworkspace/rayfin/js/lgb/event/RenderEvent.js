goog.provide('lgb.event.RenderEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @extends {goog.events.Event}
 */
lgb.event.RenderEvent = function() {
	
	goog.events.Event.call(this, lgb.event.RenderEvent.TYPE);

	

  //this.payload = mesh;

};

goog.inherits(lgb.event.RenderEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.RenderEvent.TYPE =
    goog.events.getUniqueId('RenderEvent');
    

