/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.Render');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.Render = function() {
  goog.events.Event.call(this, lgb.events.Render.TYPE);


  /**
  * The event payload a timestamp
   * @type {number}
  */
  this.payload = 0;
};
goog.inherits(lgb.events.Render, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.Render.TYPE = 'lgb.events.Render';
