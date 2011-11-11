goog.provide('lgb.events.SelectableLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
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
 * @const
 * @type {string}
 */
lgb.events.SelectableLoaded.TYPE = 'lgb.events.SelectableLoaded';
