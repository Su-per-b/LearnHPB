goog.provide('lgb.simulation.model.DisplayUnitSystem');

goog.require('lgb.core.BaseClass');

 /**
 * @constructor
 */
lgb.simulation.model.DisplayUnitSystem = function(enumInteger) {
  
 // if ( lgb.simulation.model.DisplayUnitSystem.locked ) {
   // debugger;
   // throw new Error('You may not instantiate a Singleton - use: getInstance()');
 // }
    
  
  this.intValue_ = 0;
  
  if (undefined != enumInteger) {
    this.setIntValue(enumInteger);
  }
  
  lgb.simulation.model.DisplayUnitSystem._singletonInstance = this;
      
  lgb.core.BaseClass.call(this);
};
goog.inherits(lgb.simulation.model.DisplayUnitSystem, lgb.core.BaseClass);



lgb.simulation.model.DisplayUnitSystem.locked = true;


lgb.simulation.model.DisplayUnitSystem.getInstance = function() {
            
    if ( lgb.simulation.model.DisplayUnitSystem._singletonInstance ) {
      
      return lgb.simulation.model.DisplayUnitSystem._singletonInstance;
      
    } else {
      var instance;
      lgb.simulation.model.DisplayUnitSystem.locked = false;
      instance = new lgb.simulation.model.DisplayUnitSystem();
      lgb.simulation.model.DisplayUnitSystem.locked = true;
      
      return instance;
    }
    
};




lgb.simulation.model.DisplayUnitSystem.prototype.setIntValue  = function( intValue ) {
  
    this.intValue_ = intValue;
    this.dispatchChangedEx("displayUnitSystemValue", intValue);

};

lgb.simulation.model.DisplayUnitSystem.prototype.getIntValue  = function(  ) {
  return this.intValue_;
};


lgb.simulation.model.DisplayUnitSystem.prototype.toString  = function(  ) {
  var str = lgb.simulation.model.DisplayUnitSystem.TEXT[this.intValue_];
  return str;
};



lgb.simulation.model.DisplayUnitSystem.prototype.toggle  = function(  ) {

    var newIntValue = this.intValue_ + 1;
    if (newIntValue > lgb.simulation.model.DisplayUnitSystem.MAX_INT_VALUE) {
      newIntValue = 0;
    }
    
    this.setIntValue(newIntValue);
};




lgb.simulation.model.DisplayUnitSystem.prototype.convertInternalUnitToDisplayUnit  = function( internalUnit ) {

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


lgb.simulation.model.DisplayUnitSystem.prototype.getDisplayUnitForTemp  = function(  ) {

  switch (  this.intValue_) {
    
    case lgb.simulation.model.DisplayUnitSystem.ENUM.SI : 
      return "C";
      break;
    case lgb.simulation.model.DisplayUnitSystem.ENUM.IP : 
      return "F";
      break;
    case lgb.simulation.model.DisplayUnitSystem.ENUM.INTERNAL : 
      return "K";
      break;
    default :
      debugger;
      return null;
      break;
  }

};





lgb.simulation.model.DisplayUnitSystem.prototype.changePropertyEx = function(propertyName, propertyValue) {

    if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
    }
};


lgb.simulation.model.DisplayUnitSystem.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};



 
 
lgb.simulation.model.DisplayUnitSystem.TEXT = {
  0 : 'SI',
  1: 'IP',
  2: 'INTERNAL'
};


lgb.simulation.model.DisplayUnitSystem.ENUM = {
  SI: 0,
  IP: 1,
  INTERNAL: 2
};


lgb.simulation.model.DisplayUnitSystem.MAX_INT_VALUE = 2;








