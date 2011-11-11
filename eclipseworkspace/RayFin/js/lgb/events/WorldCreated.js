goog.provide('lgb.events.WorldCreated');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.WorldCreated = function() {
	goog.events.Event.call(this, lgb.events.WorldCreated.TYPE);
};
goog.inherits(lgb.events.WorldCreated, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.WorldCreated.TYPE = 'lgb.events.WorldCreated';


