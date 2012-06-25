/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.VisibilityChanged');

goog.require('goog.events.Event');

/**
 * @param {!lgb.model.BuildingModel.Group} visiblityGroup Each in-world
 * component is a member of one or more groups.
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.events.VisibilityChanged = function(visiblityGroup) {

  goog.events.Event.call(this, lgb.events.VisibilityChanged.TYPE);

  /**
   * The event payload
   * @type {!lgb.model.BuildingModel.Group}
   */
  this.payload = visiblityGroup;
};
goog.inherits(lgb.events.VisibilityChanged, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.VisibilityChanged.TYPE = 'lgb.events.VisibilityChanged';
