goog.provide('lgb.events.Object3DLoadedEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {THREE.Object3D} obj
 * @extends {goog.events.Event}
 */
lgb.events.Object3DLoadedEvent = function(obj) {

	goog.events.Event.call(this, lgb.events.Object3DLoadedEvent.TYPE);

	/**@type {THREE.Object3D} **/
	this.payload = obj;

};
goog.inherits(lgb.events.Object3DLoadedEvent, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.events.Object3DLoadedEvent.TYPE =
    goog.events.getUniqueId('Object3DLoadedEvent');


