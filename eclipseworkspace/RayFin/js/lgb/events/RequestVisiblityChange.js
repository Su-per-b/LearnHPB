goog.provide('lgb.events.RequestVisibilityChange');

goog.require('goog.events.Event');

/**
 * Event fired when a view wishes to change the state of the data model
 * @param {!Object} stateObject
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestVisibilityChange = function(stateObject) {

	goog.events.Event.call(this, lgb.events.RequestVisibilityChange.TYPE);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = stateObject;
};
goog.inherits(lgb.events.RequestVisibilityChange, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.RequestVisibilityChange.TYPE = 'lgb.events.RequestVisibilityChange';