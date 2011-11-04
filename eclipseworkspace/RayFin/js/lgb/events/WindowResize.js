goog.provide('lgb.events.WindowResize');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {number} width
 * @param {number} height
 * @extends {goog.events.Event}
 */
lgb.events.WindowResize = function(width, height) {

	goog.events.Event.call(this, lgb.events.WindowResize.TYPE);

	this.payload = {};
	this.payload.width = width;
	this.payload.height = height;

};
goog.inherits(lgb.events.WindowResize, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.WindowResize.TYPE = 'lgb.events.WindowResize';