goog.provide('lgb.events.ComponentSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.model.scenario.SystemNode} systemNode
 * @extends {goog.events.Event}
 */
lgb.events.ComponentSelected = function(systemNode) {

	goog.events.Event.call(this, lgb.events.ComponentSelected.TYPE);

	/**@type {lgb.model.scenario.SystemNode} **/
	this.payload = systemNode;
};
goog.inherits(lgb.events.ComponentSelected, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.events.ComponentSelected.TYPE =
    goog.events.getUniqueId('ComponentSelected');

