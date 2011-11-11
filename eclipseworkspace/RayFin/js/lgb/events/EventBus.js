goog.provide('lgb.events.EventBus');
goog.require('goog.events.EventTarget');


/**
 * Global Event Bus
 * @constructor
 * @extends {goog.events.EventTarget}
 */
lgb.events.EventBus = function() {
	goog.events.EventTarget.call(this);
};
goog.inherits(lgb.events.EventBus, goog.events.EventTarget);


lgb.events.EventBus.prototype.dispatch = function(event) {


	//if (lgb.Config.DEBUG_EVENTS) {
		//var msg =  ('EventBus - dispatch: {0}'.format(event.type));

	//	console.log(msg);
	//}


	goog.events.dispatchEvent(this, event);
};
