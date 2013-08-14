/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.BaseDataSource');

goog.require('lgb.BaseClass');



/**
 * @constructor
 * @extends lgb.BaseClass
 */
lgb.component.BaseDataSource = function() {

  lgb.BaseClass.call(this);

};
goog.inherits(lgb.component.BaseDataSource, lgb.BaseClass);




lgb.component.BaseDataSource.prototype.dispatchChange = function(whatIsDirty) {
  
  if (whatIsDirty == null) {
    whatIsDirty = this;
  }
  
  this.triggerLocal(e.DataModelChanged, whatIsDirty);
};

lgb.component.BaseDataSource.prototype.dispatchChangedProperty = function(propertyName) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = this[propertyName];
   
   this.dispatchChange(whatIsDirty);
};



lgb.component.BaseDataSource.prototype.changeProperty = function(propertyName, propertyValue) {

    //if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedProperty(propertyName);
    //}
};

