/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.DataModelInitialized');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.DataModelInitialized = function() {
  goog.events.Event.call(this, e.DataModelInitialized);
};
goog.inherits(lgb.events.DataModelInitialized, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
e.DataModelInitialized = 'lgb.events.DataModelInitialized';
