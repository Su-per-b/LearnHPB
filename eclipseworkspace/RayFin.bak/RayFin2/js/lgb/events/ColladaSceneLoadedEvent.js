goog.provide('lgb.events.ColladaSceneLoadedEvent');

goog.require('goog.events.Event');

/**
 *  Event fired when a collada file is loaded
 * @param {*} scene
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.ColladaSceneLoadedEvent = function(scene) {

	goog.events.Event.call(this, lgb.events.ColladaSceneLoadedEvent.TYPE);

	//this.payload = {};

  /**
   * The event payload
   * @type {*}
   */
  this.payload = scene;

};
goog.inherits(lgb.events.ColladaSceneLoadedEvent, goog.events.Event);


/**
 * Event type
 * @define {string}
 */
lgb.events.ColladaSceneLoadedEvent.TYPE = 'lgb.events.ColladaSceneLoadedEvent';
