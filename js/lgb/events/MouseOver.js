goog.provide('lgb.events.MouseOver');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.MouseOver = function() {
  goog.events.Event.call(this, lgb.events.MouseOver.TYPE);
};
goog.inherits(lgb.events.MouseOver, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.MouseOver.TYPE = 'lgb.events.MouseOver';
