goog.provide('lgb.events.Object3DLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {THREE.Object3D} obj
 * @extends {goog.events.Event}
 */
lgb.events.Object3DLoaded = function(obj) {

	goog.events.Event.call(this, lgb.events.Object3DLoaded.TYPE);

	/**@type {THREE.Object3D} **/
	this.payload = obj;

};
goog.inherits(lgb.events.Object3DLoaded, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.Object3DLoaded.TYPE = 'lgb.events.Object3DLoaded';