/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.EventBus');
goog.require('goog.events.EventTarget');


/**
 * Global Event Bus
 * @constructor
 * @extends {goog.events.EventTarget}
 */
lgb.core.EventBus = function() {
  goog.events.EventTarget.call(this);
};
goog.inherits(lgb.core.EventBus, goog.events.EventTarget);


/**
 * Dispatches and event on the global event bus.
 * @param {goog.events.Event} event Could be any event.
 */
lgb.core.EventBus.prototype.dispatch = function(event) {
  goog.events.dispatchEvent(this, event);
};
