goog.provide('lgb.event.RenderEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.RenderEvent = function() {
	goog.events.Event.call(this, lgb.event.RenderEvent.TYPE);
};

goog.inherits(lgb.event.RenderEvent , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.RenderEvent.TYPE =
    goog.events.getUniqueId('RenderEvent');
    

