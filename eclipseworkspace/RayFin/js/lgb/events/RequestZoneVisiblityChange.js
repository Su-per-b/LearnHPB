goog.provide('lgb.events.RequestZoneVisiblityChange');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {number} zoneNumber 0-9.
 * @param {boolean} makeVisible
 * @extends {goog.events.Event}
 */
lgb.events.RequestZoneVisiblityChange = function(zoneNumber, makeVisible) {

  goog.events.Event.call(this, lgb.events.RequestZoneVisiblityChange.TYPE);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = {
      zoneNumber: zoneNumber,
      makeVisible: makeVisible
  };
};
goog.inherits(lgb.events.RequestZoneVisiblityChange, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestZoneVisiblityChange.TYPE = 'lgb.events.RequestZoneVisiblityChange';
