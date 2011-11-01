goog.provide('lgb.events.SelectableLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 *  Event fired when a collada file is loaded
 * @param {THREE.Mesh}  mesh
 * @extends {goog.events.Event}
 */
lgb.events.SelectableLoaded = function(mesh) {

	goog.events.Event.call(this, lgb.events.SelectableLoaded.TYPE);

	//this.payload = {};

 /**@type {THREE.Mesh} **/
  this.payload = mesh;

};
goog.inherits(lgb.events.SelectableLoaded, goog.events.Event);

/**
 * Event type
 * @define {string}
 */
lgb.events.SelectableLoaded.TYPE = 'lgb.events.SelectableLoaded';