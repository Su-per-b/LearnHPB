goog.provide('lgb.events.RequestActivateView');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {boolean} makeActiveFlag If set to true, then the View should be
 * shown to the user.
 * @extends {goog.events.Event}
 */
lgb.events.RequestActivateView = function(makeActiveFlag) {

  goog.events.Event.call(this, lgb.events.RequestActivateView.TYPE);

  /**
   * The event payload
   * @type {boolean}
   */
  this.payload = makeActiveFlag;

};
goog.inherits(lgb.events.RequestActivateView, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestActivateView.TYPE = 'lgb.events.RequestActivateView';
