/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.ViewInitialized');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.ViewInitialized = function() {

  goog.events.Event.call(this, lgb.events.ViewInitialized.TYPE);

};
goog.inherits(lgb.events.ViewInitialized, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.ViewInitialized.TYPE = 'lgb.events.ViewInitialized';
