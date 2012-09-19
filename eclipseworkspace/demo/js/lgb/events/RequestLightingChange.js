/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.RequestLightingChange');

goog.require('goog.events.Event');
goog.require('lgb.model.LightingModel.State');

/**
 * @param {!lgb.model.LightingModel.State} newState to change the model to.
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestLightingChange = function(newState) {

  goog.events.Event.call(this, lgb.events.RequestLightingChange.TYPE);

  /**
   * The event payload
   * @type {!THREE.Camera}
   */
  this.payload = newState;
};
goog.inherits(lgb.events.RequestLightingChange, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestLightingChange.TYPE = 'lgb.events.RequestLightingChange';



