/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.core.BaseModel');

goog.require('lgb.core.BaseClass');


/**
 * @constructor
 * @extends lgb.core.BaseClass
 */
lgb.core.BaseModel = function() {
  lgb.core.BaseClass.call(this);
};
goog.inherits(lgb.core.BaseModel, lgb.core.BaseClass);



lgb.core.BaseModel.prototype.changePropertyEx = function(propertyName, propertyValue) {

    if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
    }
};


lgb.core.BaseModel.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};