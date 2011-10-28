goog.provide('lgb.events.WindowResizeEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {number} width
 * @param {number} height
 * @extends {goog.events.Event}
 */
lgb.events.WindowResizeEvent = function(width, height) {

	goog.events.Event.call(this, lgb.events.WindowResizeEvent.TYPE);

	this.payload = {};
	this.payload.width = width;
	this.payload.height = height;

};
goog.inherits(lgb.events.WindowResizeEvent, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.events.WindowResizeEvent.TYPE =
    goog.events.getUniqueId('WindowResizeEvent');


