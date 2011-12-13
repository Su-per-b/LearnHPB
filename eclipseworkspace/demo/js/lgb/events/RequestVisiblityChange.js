/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.RequestVisibilityChange');

goog.require('goog.events.Event');
goog.require('lgb.model.BuildingModel.Group');


/**
 * Event fired when a view wishes to change the state of the data model
 * @param {!lgb.model.BuildingModel.Group} visiblityGroup Each in-world
 * component is a member of one or more groups.
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.RequestVisibilityChange = function(visiblityGroup) {

  goog.events.Event.call(this, lgb.events.RequestVisibilityChange.TYPE);

  /**
   * The event payload
   * @type {!lgb.model.BuildingModel.Group}
   */
  this.payload = visiblityGroup;
};
goog.inherits(lgb.events.RequestVisibilityChange, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.RequestVisibilityChange.TYPE = 'lgb.events.RequestVisibilityChange';
