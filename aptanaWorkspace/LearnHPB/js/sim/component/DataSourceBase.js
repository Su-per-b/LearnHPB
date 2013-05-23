/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('sim.component.DataSourceBase');

goog.require('sim.BaseClass');
goog.require('sim.events.DataSourceChanged');


/**
 * @constructor
 * @extends sim.BaseClass
 */
sim.component.DataSourceBase = function() {
  sim.BaseClass.call(this);
};
goog.inherits(sim.component.DataSourceBase, sim.BaseClass);



/**
 * dispatches a local DataModelChanged Event
 * used to notify the view
 * @protected
 */
sim.component.DataSourceBase.prototype.dispatchChange = function() {
  this.dispatchLocal(new sim.events.DataSourceChanged(this));
};

