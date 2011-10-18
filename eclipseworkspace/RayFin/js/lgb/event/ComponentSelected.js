goog.provide('lgb.event.ComponentSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @extends {goog.events.Event}
 */
lgb.event.ComponentSelected = function(systemNode) {
	
	goog.events.Event.call(this, lgb.event.ComponentSelected.TYPE);
	
	this.payload = systemNode;
};

goog.inherits(lgb.event.ComponentSelected , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ComponentSelected.TYPE =
    goog.events.getUniqueId('ComponentSelected');
    