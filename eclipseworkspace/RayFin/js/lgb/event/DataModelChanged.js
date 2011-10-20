goog.provide('lgb.event.DataModelChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.DataModelChanged = function() {
	
	goog.events.Event.call(this, lgb.event.DataModelChanged.TYPE);

};

goog.inherits(lgb.event.DataModelChanged , goog.events.Event);

/**
 * Event type 
 * @type {string}
 */
lgb.event.DataModelChanged.TYPE =
    goog.events.getUniqueId('DataModelChanged');
    

