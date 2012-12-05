/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.DataModelChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {Object=} whatIsDirty And object with properties of telling
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
lgb.events.DataModelChanged = function(whatIsDirty) {

  goog.events.Event.call(this, lgb.events.DataModelChanged.TYPE);


  if (whatIsDirty != null) {

    /**
     * The event payload
     * @type {Object}
     */
         this.payload = whatIsDirty;

  }


};
goog.inherits(lgb.events.DataModelChanged, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.DataModelChanged.TYPE = 'lgb.events.DataModelChanged';
