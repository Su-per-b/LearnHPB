/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.BaseEvent');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {Object} payload
 * @extends {goog.events.Event}
 */
lgb.events.BaseEvent = function(payload, type) {

  goog.events.Event.call(this, type);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = payload;
  
};
goog.inherits(lgb.events.BaseEvent, goog.events.Event);




