/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.RequestShowViewPoint');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!THREE.Camera} camera The new camera position to go to.
 * @extends {goog.events.Event}
 */
lgb.events.RequestShowViewPoint = function(viewPointNode) {

  goog.events.Event.call(this, lgb.events.RequestShowViewPoint.TYPE);

  /**
   * The event payload
   * @type {!THREE.Camera}
   */
  this.payload = viewPointNode;
};
goog.inherits(lgb.events.RequestShowViewPoint, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestShowViewPoint.TYPE = 'lgb.events.RequestShowViewPoint';



