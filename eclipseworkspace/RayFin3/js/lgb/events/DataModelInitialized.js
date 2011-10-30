goog.provide('lgb.events.DataModelInitialized');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.DataModelInitialized = function() {
	goog.events.Event.call(this, lgb.events.DataModelInitialized.TYPE);
};
goog.inherits(lgb.events.DataModelInitialized, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.DataModelInitialized.TYPE = 'lgb.events.DataModelInitialized';