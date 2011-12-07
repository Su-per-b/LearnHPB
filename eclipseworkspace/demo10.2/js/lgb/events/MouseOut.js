goog.provide('lgb.events.MouseOut');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.MouseOut = function() {
  goog.events.Event.call(this, lgb.events.MouseOut.TYPE);
};
goog.inherits(lgb.events.MouseOut, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.MouseOut.TYPE = 'lgb.events.MouseOut';
