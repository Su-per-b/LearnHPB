goog.provide('lgb.events.TrackBallControlPause');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {boolean} pauseFlag Set to true to pause the mouse controls
 * else set to false.
 * @extends {goog.events.Event}
 */
lgb.events.TrackBallControlPause = function(pauseFlag) {

	goog.events.Event.call(this, lgb.events.TrackBallControlPause.TYPE);

	this.payload = pauseFlag;

};
goog.inherits(lgb.events.TrackBallControlPause, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.TrackBallControlPause.TYPE = 'lgb.events.TrackBallControlPause';