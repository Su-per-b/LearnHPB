goog.provide('lgb.events.SelectableLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {THREE.Object3D}  obj The 3D object to make selectable.
 * @extends {goog.events.Event}
 */
lgb.events.SelectableLoaded = function(obj) {

	goog.events.Event.call(this, lgb.events.SelectableLoaded.TYPE);
	
 /**@type {THREE.Object3D} **/
  this.payload = obj;

};
goog.inherits(lgb.events.SelectableLoaded, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.SelectableLoaded.TYPE = 'lgb.events.SelectableLoaded';