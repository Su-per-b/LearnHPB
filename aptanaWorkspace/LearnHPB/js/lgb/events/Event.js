/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.Event');
goog.provide('e.Event');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {number} zoneNumber 0-9.
 * @param {boolean} makeVisible Tells weather to show the red zone cube.
 * @extends {goog.events.Event}
 */
lgb.events.Event = function(type, payload) {

  goog.events.Event.call(this, type);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = payload;
  
};
goog.inherits(lgb.events.Event, goog.events.Event);




/*
lgb.events.RequestAddToGUI = function(payload) {
  goog.events.Event.call(this, lgb.events.RequestAddToGUI.TYPE);
  this.payload = payload;
};
goog.inherits(lgb.events.RequestAddToGUI, goog.events.Event);

*/

e.Event = function() {};

e.RequestAddToGUI = 'e.RequestAddToGUI';
e.RequestAddToLayout = 'e.RequestAddToLayout';
e.Resize = 'e.Resize';
e.LayoutChange = 'e.LayoutChange';
e.ViewInitialized = 'e.ViewInitialized';
e.DataModelInitialized = 'e.DataModelInitialized';


