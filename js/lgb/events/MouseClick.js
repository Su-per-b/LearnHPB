goog.provide('lgb.events.MouseClick');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.MouseClick = function() {
  goog.events.Event.call(this, lgb.events.MouseClick.TYPE);
};
goog.inherits(lgb.events.MouseClick, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.MouseClick.TYPE = 'lgb.events.MouseClick';
