/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('sim.events.DataSourceChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!sim.component.DataSourceBase} ds The datasource which has changed.
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
sim.events.DataSourceChanged = function(ds) {

  goog.events.Event.call(this, sim.events.DataSourceChanged.TYPE);

  /**
   * The event payload
   * @type {!sim.component.DataSourceBase}
   */
  this.payload = ds;
};
goog.inherits(sim.events.DataSourceChanged, goog.events.Event);


/**
 * Event type
 * @const
 * @type {string}
 */
sim.events.DataSourceChanged.TYPE = 'sim.events.DataSourceChanged';
