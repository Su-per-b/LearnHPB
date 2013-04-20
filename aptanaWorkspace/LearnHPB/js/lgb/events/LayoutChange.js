/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.LayoutChange');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.LayoutChange = function() {

  goog.events.Event.call(this, lgb.events.LayoutChange.TYPE);

  this.payload = {};

};
goog.inherits(lgb.events.LayoutChange, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.LayoutChange.TYPE = 'lgb.events.LayoutChange';
