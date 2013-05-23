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

lgb.model.BaseModel.prototype.dispatchChangedProperty = function(propertyName) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = true;
   
   this.dispatchChange(whatIsDirty);
};



lgb.model.BaseModel.prototype.changeProperty = function(propertyName, propertyValue) {

    if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedProperty(propertyName);
    }
};

