goog.provide('lgb.events.ComponentIDSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {string} id
 * @extends {goog.events.Event}
 */
lgb.events.ComponentIDSelected = function(id) {

	goog.events.Event.call(this, lgb.events.ComponentIDSelected.TYPE);

	/**@type {string} **/
	this.payload = id;
};
goog.inherits(lgb.events.ComponentIDSelected, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.ComponentIDSelected.TYPE = 'lgb.events.ComponentIDSelected';