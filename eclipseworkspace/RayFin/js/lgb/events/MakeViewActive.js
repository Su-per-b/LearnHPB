goog.provide('lgb.events.MakeViewActive');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {boolean} makeActiveFlag
 * @extends {goog.events.Event}
 */
lgb.events.MakeViewActive = function(makeActiveFlag) {

	goog.events.Event.call(this, lgb.events.MakeViewActive.TYPE);

  /**
   * The event payload
   * @type {boolean}
   */
  this.payload = makeActiveFlag;

};
goog.inherits(lgb.events.MakeViewActive, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.MakeViewActive.TYPE = 'lgb.events.MakeViewActive';