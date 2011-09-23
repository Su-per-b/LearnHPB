goog.provide('lgb.event.EventBus');

goog.require('goog.events.EventTarget');


/**
 * Global Event Bus
 * @constructor
 */
lgb.event.EventBus = function() {
	goog.events.EventTarget.call(this);
};


goog.inherits(lgb.event.EventBus, goog.events.EventTarget);


lgb.event.EventBus.prototype.dispatch = function(event) {
	goog.events.dispatchEvent(this, event);
};