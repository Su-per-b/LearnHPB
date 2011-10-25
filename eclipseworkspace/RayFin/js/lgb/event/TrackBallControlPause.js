goog.provide('lgb.event.TrackBallControlPause');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {boolean} pauseFlag Set to true to pause the mouse controls
 * else set to false.
 * @extends {goog.events.Event}
 */
lgb.event.TrackBallControlPause = function(pauseFlag) {

	goog.events.Event.call(this, lgb.event.TrackBallControlPause.TYPE);

	this.payload = pauseFlag;

};
goog.inherits(lgb.event.TrackBallControlPause, goog.events.Event);

/**
 * Event type
 * @const {string}
 */
lgb.event.TrackBallControlPause.TYPE = 'lgb.event.TrackBallControlPause';


