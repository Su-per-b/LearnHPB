goog.provide('lgb.events.WorldSelectionChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {string} selectionID A unique identifier for the item selected.
 * @extends {goog.events.Event}
 */
lgb.events.WorldSelectionChanged = function(selectionID) {

  goog.events.Event.call(this, lgb.events.WorldSelectionChanged.TYPE);

  /**
   * The event payload
   * @type {string}
   */
  this.payload = selectionID;
};
goog.inherits(lgb.events.WorldSelectionChanged, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.WorldSelectionChanged.TYPE = 'lgb.events.WorldSelectionChanged';
