goog.provide('lgb.event.DataModelChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {Object=} whatIsDirty And object with properties of telling 
 * what has changed in the data model
 * @extends {goog.events.Event}
 */
lgb.event.DataModelChanged = function(whatIsDirty) {

	goog.events.Event.call(this, lgb.event.DataModelChanged.TYPE);
	
	
	if (whatIsDirty != null) {
		
	  /**
	   * The event payload
	   * @type {Object}
	   */
	  this.payload = whatIsDirty;
		
	}

  
};
goog.inherits(lgb.event.DataModelChanged, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.event.DataModelChanged.TYPE =
    goog.events.getUniqueId('DataModelChanged');


