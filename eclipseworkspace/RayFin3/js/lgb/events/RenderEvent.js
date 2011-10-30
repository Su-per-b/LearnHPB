goog.provide('lgb.events.RenderEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RenderEvent = function() {
	goog.events.Event.call(this, lgb.events.RenderEvent.TYPE);
};
goog.inherits(lgb.events.RenderEvent, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.RenderEvent.TYPE = 'lgb.events.RenderEvent';