goog.provide('lgb.event.ComponentIDSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {id} 
 * @extends {goog.events.Event}
 */
lgb.event.ComponentIDSelected = function(id) {
	
	goog.events.Event.call(this, lgb.event.ComponentIDSelected.TYPE);
	
	this.payload = id;
};

goog.inherits(lgb.event.ComponentIDSelected , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ComponentIDSelected.TYPE =
    goog.events.getUniqueId('ComponentIDSelected');
    