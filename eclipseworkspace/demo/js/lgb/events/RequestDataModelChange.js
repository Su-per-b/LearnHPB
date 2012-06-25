/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.RequestDataModelChange');

goog.require('goog.events.Event');

/**
 * Event fired when a view wishes to change the state of the data model
 * @param {!Object} stateObject This maybe should be changes to a goog.map.
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestDataModelChange = function(stateObject) {

  goog.events.Event.call(this, lgb.events.RequestDataModelChange.TYPE);

  /**
   * The event payload
   * @type {Object}
   */
  this.payload = stateObject;
};
goog.inherits(lgb.events.RequestDataModelChange, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestDataModelChange.TYPE = 'lgb.events.RequestDataModelChange';



