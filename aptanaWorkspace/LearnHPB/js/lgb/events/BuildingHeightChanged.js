/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.BuildingHeightChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!lgb.model.EnvelopeModel} envelopeModel The model which has changed.
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
lgb.events.BuildingHeightChanged = function( buildingHeightModel ) {
    
  goog.events.Event.call(this, lgb.events.BuildingHeightChanged.TYPE);

  /**
   * The event payload
   * @type {!lgb.model.EnvelopeModel}
   */
  this.payload = buildingHeightModel;
};
goog.inherits(lgb.events.BuildingHeightChanged, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.BuildingHeightChanged.TYPE = 'lgb.events.BuildingHeightChanged';
