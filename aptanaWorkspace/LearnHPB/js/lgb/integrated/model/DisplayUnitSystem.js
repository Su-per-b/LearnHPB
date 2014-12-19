goog.provide('lgb.integrated.model.DisplayUnitSystem');

goog.require('lgb.core.BaseClass');

 /**
 * @constructor
 */
lgb.integrated.model.DisplayUnitSystem = function(enumInteger) {
  
 // if ( lgb.integrated.model.DisplayUnitSystem.locked ) {
   // lgb.logSevere('You may not instantiate a Singleton - use: getInstance()');
 // }
    
  
  this.intValue_ = 0;
  
  if (undefined != enumInteger) {
    this.setIntValue(enumInteger);
  }
  
  lgb.integrated.model.DisplayUnitSystem._singletonInstance = this;
      
  lgb.core.BaseClass.call(this);
};
goog.inherits(lgb.integrated.model.DisplayUnitSystem, lgb.core.BaseClass);



lgb.integrated.model.DisplayUnitSystem.locked = true;


lgb.integrated.model.DisplayUnitSystem.getInstance = function() {
            
    if ( lgb.integrated.model.DisplayUnitSystem._singletonInstance ) {
      
      return lgb.integrated.model.DisplayUnitSystem._singletonInstance;
      
    } else {
      var instance;
      lgb.integrated.model.DisplayUnitSystem.locked = false;
      instance = new lgb.integrated.model.DisplayUnitSystem();
      lgb.integrated.model.DisplayUnitSystem.locked = true;
      
      return instance;
    }
    
};




lgb.integrated.model.DisplayUnitSystem.prototype.setIntValue  = function( intValue ) {
  
    this.intValue_ = intValue;
    this.dispatchChangedEx("displayUnitSystemValue", intValue);

};

lgb.integrated.model.DisplayUnitSystem.prototype.getIntValue  = function(  ) {
  return this.intValue_;
};


lgb.integrated.model.DisplayUnitSystem.prototype.toString  = function(  ) {
  var str = lgb.integrated.model.DisplayUnitSystem.TEXT[this.intValue_];
  return str;
};



lgb.integrated.model.DisplayUnitSystem.prototype.toggle  = function(  ) {

    var newIntValue = this.intValue_ + 1;
    if (newIntValue > lgb.integrated.model.DisplayUnitSystem.MAX_INT_VALUE) {
      newIntValue = 0;
    }
    
    this.setIntValue(newIntValue);
};




lgb.integrated.model.DisplayUnitSystem.prototype.convertInternalUnitToDisplayUnit  = function( internalUnit ) {

  switch ( internalUnit ) {
    case "K" : 
      return this.getDisplayUnitForTemp();
      break;
    default :
      debugger;
      return null;
      break;
  }

};


lgb.integrated.model.DisplayUnitSystem.prototype.getDisplayUnitForTemp  = function(  ) {

  switch (  this.intValue_) {
    
    case lgb.integrated.model.DisplayUnitSystem.ENUM.SI : 
      return "C";
      break;
    case lgb.integrated.model.DisplayUnitSystem.ENUM.IP : 
      return "F";
      break;
    case lgb.integrated.model.DisplayUnitSystem.ENUM.INTERNAL : 
      return "K";
      break;
    default :
      debugger;
      return null;
      break;
  }

};





lgb.integrated.model.DisplayUnitSystem.prototype.changePropertyEx = function(propertyName, propertyValue) {

    if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
    }
};


lgb.integrated.model.DisplayUnitSystem.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};



 
 
lgb.integrated.model.DisplayUnitSystem.TEXT = {
  0 : 'SI',
  1: 'IP',
  2: 'INTERNAL'
};


lgb.integrated.model.DisplayUnitSystem.ENUM = {
  SI: 0,
  IP: 1,
  INTERNAL: 2
};


lgb.integrated.model.DisplayUnitSystem.MAX_INT_VALUE = 2;








