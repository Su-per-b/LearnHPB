goog.provide('lgb.events.ViewClosed');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.ViewClosed = function() {

  goog.events.Event.call(this, lgb.events.ViewClosed.TYPE);

};
goog.inherits(lgb.events.ViewClosed, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.ViewClosed.TYPE = 'lgb.events.ViewClosed';
