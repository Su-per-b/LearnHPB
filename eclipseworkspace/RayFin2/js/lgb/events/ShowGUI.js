goog.provide('lgb.events.ShowGUI');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @extends {goog.events.Event}
 */
lgb.events.ShowGUI = function() {

	goog.events.Event.call(this, lgb.events.ShowGUI.TYPE);

};
goog.inherits(lgb.events.ShowGUI, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.ShowGUI.TYPE = 'lgb.events.ShowGUI';