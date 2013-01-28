/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('sim.events.DataModelChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {Object=} whatIsDirty And object with properties of telling
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
sim.events.DataModelChanged = function(whatIsDirty) {

  goog.events.Event.call(this, sim.events.DataModelChanged.TYPE);


  if (whatIsDirty != null) {

    /**
     * The event payload
     * @type {Object}
     */
         this.payload = whatIsDirty;

  }


};
goog.inherits(sim.events.DataModelChanged, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
sim.events.DataModelChanged.TYPE = 'sim.events.DataModelChanged';
