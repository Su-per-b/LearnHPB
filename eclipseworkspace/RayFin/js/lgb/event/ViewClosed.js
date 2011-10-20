goog.provide('lgb.event.ViewClosed');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.ViewClosed = function() {
	
	goog.events.Event.call(this, lgb.event.ViewClosed.TYPE);

};

goog.inherits(lgb.event.ViewClosed , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ViewClosed.TYPE =
    goog.events.getUniqueId('ViewClosed');
    

