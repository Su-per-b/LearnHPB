goog.provide('lgb.events.RequestDataModelChange');

goog.require('goog.events.Event');

/**
 * Event fired when a view wishes to change the state of the data model
 * @param {!Object} stateObject
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestDataModelChange = function(stateObject) {

	goog.events.Event.call(this, lgb.events.RequestDataModelChange.TYPE);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = stateObject;
};
goog.inherits(lgb.events.RequestDataModelChange, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.RequestDataModelChange.TYPE = 'lgb.events.RequestDataModelChange';



