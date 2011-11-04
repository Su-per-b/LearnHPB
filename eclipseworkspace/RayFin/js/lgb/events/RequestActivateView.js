goog.provide('lgb.events.RequestActivateView');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {boolean} makeActiveFlag
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
 * @define {string}
 */
lgb.events.RequestActivateView.TYPE = 'lgb.events.RequestActivateView';