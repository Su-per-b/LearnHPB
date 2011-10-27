goog.provide('lgb.event.DataModelInitialized');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.DataModelInitialized = function() {
	goog.events.Event.call(this, lgb.event.DataModelInitialized.TYPE);
};
goog.inherits(lgb.event.DataModelInitialized, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.event.DataModelInitialized.TYPE =
    goog.events.getUniqueId('DataModelInitialized');


