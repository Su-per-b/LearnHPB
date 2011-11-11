goog.provide('lgb.events.RequestWorldSelectionChange');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {string} selectionID A unique identifier for the item selected.
 * @extends {goog.events.Event}
 */
lgb.events.RequestWorldSelectionChange = function(selectionID) {

	goog.events.Event.call(this, lgb.events.RequestWorldSelectionChange.TYPE);

  /**
   * The event payload
   * @type {string}
   */
  this.payload = selectionID;
};
goog.inherits(lgb.events.RequestWorldSelectionChange, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestWorldSelectionChange.TYPE = 'lgb.events.RequestWorldSelectionChange';
