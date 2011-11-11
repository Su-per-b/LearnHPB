goog.provide('lgb.events.Object3DSelected');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when an object is selected in the world.
 * @param {THREE.CollisionSystem} collisionSystem Used to see what was selected.
 * @extends {goog.events.Event}
 */
lgb.events.Object3DSelected = function(collisionSystem) {

  goog.events.Event.call(this, lgb.events.Object3DSelected.TYPE);

  //this.payload = {};

 /**@type {THREE.CollisionSystem} **/
  this.payload = collisionSystem;

};
goog.inherits(lgb.events.Object3DSelected, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.Object3DSelected.TYPE = 'lgb.events.Object3DSelected';
