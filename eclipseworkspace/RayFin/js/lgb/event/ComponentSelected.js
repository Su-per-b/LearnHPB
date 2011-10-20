goog.provide('lgb.event.ComponentSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.model.scenario.SystemNode} systemNode
 * @extends {goog.events.Event}
 */
lgb.event.ComponentSelected = function(systemNode) {
	
	goog.events.Event.call(this, lgb.event.ComponentSelected.TYPE);
	
	/**@type {lgb.model.scenario.SystemNode} **/
	this.payload = systemNode;
};

goog.inherits(lgb.event.ComponentSelected , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.ComponentSelected.TYPE =
    goog.events.getUniqueId('ComponentSelected');
    