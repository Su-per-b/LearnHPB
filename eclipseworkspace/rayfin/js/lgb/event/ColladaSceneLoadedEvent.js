goog.provide('lgb.event.ColladaSceneLoadedEvent');

goog.require('goog.events.Event');

/**
 *  Event fired when a collada file is loaded
 * @param {*} scene
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.event.ColladaSceneLoadedEvent = function(scene) {

	goog.events.Event.call(this, lgb.event.ColladaSceneLoadedEvent.TYPE);

	//this.payload = {};

  /**
   * The event payload
   * @type {*}
   */
  this.payload = scene;

};
goog.inherits(lgb.event.ColladaSceneLoadedEvent, goog.events.Event);

/**
 * Event type
 * @type {string}
 */
lgb.event.ColladaSceneLoadedEvent.TYPE =
    goog.events.getUniqueId('ColladaSceneLoadedEvent');


