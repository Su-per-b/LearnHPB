goog.provide('lgb.event.WorldCreated');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @extends {goog.events.Event}
 */
lgb.event.WorldCreated = function() {
	
	goog.events.Event.call(this, lgb.event.WorldCreated.TYPE);

};

goog.inherits(lgb.event.WorldCreated , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.WorldCreated.TYPE =
    goog.events.getUniqueId('WorldCreated');
    

