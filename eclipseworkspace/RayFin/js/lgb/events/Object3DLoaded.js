goog.provide('lgb.events.Object3DLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {THREE.Object3D} obj The object that the Event target
 * would like added to the stage.
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
 * @const
 * @type {string}
 */
lgb.events.Object3DLoaded.TYPE = 'lgb.events.Object3DLoaded';
