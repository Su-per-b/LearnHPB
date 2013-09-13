/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.BaseModel');

goog.require('lgb.core.BaseClass');


/**
 * @constructor
 * @extends lgb.core.BaseClass
 */
lgb.world.model.BaseModel = function() {
  lgb.core.BaseClass.call(this);
};
goog.inherits(lgb.world.model.BaseModel, lgb.core.BaseClass);



lgb.world.model.BaseModel.prototype.changePropertyEx = function(propertyName, propertyValue) {

    if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
    }
};


lgb.world.model.BaseModel.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};