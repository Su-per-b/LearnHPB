/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.BaseModel');

goog.require('lgb.BaseClass');
goog.require('lgb.events.DataModelChanged');

/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.model.BaseModel = function() {
  lgb.BaseClass.call(this);
};
goog.inherits(lgb.model.BaseModel, lgb.BaseClass);


/**
 * @param {Object=} whatIsDirty And object with properties of telling
 * what has changed in the data model.
 * @protected
 */
lgb.model.BaseModel.prototype.dispatchChange = function(whatIsDirty) {
    this.dispatchLocal(new lgb.events.DataModelChanged(whatIsDirty));
};


/**
 * returns a CSS id based on the fullname of the class
 * @protected
 * @return {string} The CSS ID.
 */
lgb.model.BaseModel.prototype.getCssID = function() {
  if (this._NAME === undefined) {
    throw ('this._NAME === undefined');
  } else {
    var id = this._NAME.split('.').join('-');
    return id;
  }
};
