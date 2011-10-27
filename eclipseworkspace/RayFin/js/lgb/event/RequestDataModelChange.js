goog.provide('lgb.event.RequestDataModelChange');

goog.require('goog.events.Event');

/**
 * Event fired when a view wishes to change the state of the data model
 * @param {!Object} stateObject
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.RequestDataModelChange = function(stateObject) {

	goog.events.Event.call(this, lgb.event.RequestDataModelChange.TYPE);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = stateObject;
};
goog.inherits(lgb.event.RequestDataModelChange, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.event.RequestDataModelChange.TYPE = 'lgb.event.RequestDataModelChange';



