/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.RequestChangeCameraTarget');

goog.require('goog.events.Event');

/**
 * @param {!THREE.Vector3} target The new target to look at.
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestChangeCameraTarget = function(target) {

  goog.events.Event.call(this, lgb.events.RequestChangeCameraTarget.TYPE);

  /**
   * The event payload
   * @type {!THREE.Vector3}
   */
  this.payload = target;
};
goog.inherits(lgb.events.RequestChangeCameraTarget, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestChangeCameraTarget.TYPE =
  'lgb.events.RequestChangeCameraTarget';



