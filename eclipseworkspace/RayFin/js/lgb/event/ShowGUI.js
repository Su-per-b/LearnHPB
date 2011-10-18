goog.provide('lgb.event.ShowGUI');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {mesh} 
 * @extends {goog.events.Event}
 */
lgb.event.ShowGUI = function() {
	
	goog.events.Event.call(this, lgb.event.ShowGUI.TYPE);

};

goog.inherits(lgb.event.ShowGUI , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ShowGUI.TYPE =
    goog.events.getUniqueId('ShowGUI');
    