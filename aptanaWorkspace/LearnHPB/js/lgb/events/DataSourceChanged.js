/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.events.DataSourceChanged');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {!lgb.component.BaseDataSource} ds The datasource which has changed.
 * what has changed in the data model.
 * @extends {goog.events.Event}
 */
lgb.events.DataSourceChanged = function(ds) {

  goog.events.Event.call(this, lgb.events.DataSourceChanged.TYPE);

  /**
   * The event payload
   * @type {!lgb.component.BaseDataSource}
   */
  this.payload = ds;
};
goog.inherits(lgb.events.DataSourceChanged, goog.events.Event);

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.events.DataSourceChanged.TYPE = 'lgb.events.DataSourceChanged';
