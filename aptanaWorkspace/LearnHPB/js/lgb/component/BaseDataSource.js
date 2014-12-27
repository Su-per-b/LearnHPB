/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.BaseDataSource');

goog.require('lgb.core.BaseClass');



/**
 * @constructor
 * @extends lgb.core.BaseClass
 */
lgb.component.BaseDataSource = function() {

  lgb.core.BaseClass.call(this);

};
goog.inherits(lgb.component.BaseDataSource, lgb.core.BaseClass);




lgb.component.BaseDataSource.prototype.changePropertyEx = function(propertyName, propertyValue) {

   // if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
   // }
};




lgb.component.BaseDataSource.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};