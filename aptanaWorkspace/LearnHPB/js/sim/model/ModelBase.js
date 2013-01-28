/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('sim.model.ModelBase');

goog.require('sim.BaseClass');
goog.require('sim.events.DataModelChanged');

/**
 * @constructor
 * @extends lgb.BaseClass
 */
sim.model.ModelBase = function() {
  sim.BaseClass.call(this);
};
goog.inherits(sim.model.ModelBase, sim.BaseClass);


/**
 * @param {Object=} whatIsDirty And object with properties of telling
 * what has changed in the data model.
 * @protected
 */
sim.model.ModelBase.prototype.dispatchChange = function(whatIsDirty) {
    this.dispatchLocal(new lgb.events.DataModelChanged(whatIsDirty));
};


/**
 * returns a CSS id based on the fullname of the class
 * @protected
 * @return {string} The CSS ID.
 */
sim.model.ModelBase.prototype.getCssID = function() {
  if (this._NAME === undefined) {
    throw ('this._NAME === undefined');
  } else {
    var id = this._NAME.split('.').join('-');
    return id;
  }
};
