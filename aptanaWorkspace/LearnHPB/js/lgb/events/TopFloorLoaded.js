/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.TopFloorLoaded');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!lgb.model.EnvelopeModel} envelopeModel The model which has changed.
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
lgb.events.TopFloorLoaded = function( topFloorContainer ) {

  goog.events.Event.call(this, lgb.events.TopFloorLoaded.TYPE);

  /**
   * The event payload
   * @type {!lgb.model.EnvelopeModel}
   */
  this.payload = topFloorContainer;
};
goog.inherits(lgb.events.TopFloorLoaded, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.TopFloorLoaded.TYPE = 'lgb.events.TopFloorLoaded';
