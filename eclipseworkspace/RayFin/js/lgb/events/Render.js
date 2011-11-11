goog.provide('lgb.events.Render');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.Render = function() {
  goog.events.Event.call(this, lgb.events.Render.TYPE);
};
goog.inherits(lgb.events.Render, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.Render.TYPE = 'lgb.events.Render';
