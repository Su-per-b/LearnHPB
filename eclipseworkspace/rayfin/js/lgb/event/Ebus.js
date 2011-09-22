goog.provide('lgb.event.Ebus');

goog.require('goog.events.EventTarget');


/**
 * Global Event Bus
 * @constructor
 */
lgb.event.Ebus = function() {
	goog.events.EventTarget.call(this);
};


goog.inherits(lgb.event.Ebus, goog.events.EventTarget);


lgb.event.Ebus.prototype.dispatch = function(event) {
	
	//this.dispatchEvent(this, event);
	goog.events.dispatchEvent(this, event);
};