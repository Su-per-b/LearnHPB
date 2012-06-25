/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.RequestGoToViewPointName');

goog.require('goog.events.Event');

/**
 * @param {!string} name The name of the viewpoint.
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestGoToViewPointName = function(name) {

  goog.events.Event.call(this, lgb.events.RequestGoToViewPointName.TYPE);

  /**
   * The event payload
   * @type {string}
   */
  this.payload = name;
};
goog.inherits(lgb.events.RequestGoToViewPointName, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestGoToViewPointName.TYPE =
  'lgb.events.RequestGoToViewPointName';



