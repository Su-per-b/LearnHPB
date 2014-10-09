goog.provide('lgb.integrated.model.unit.None');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.None = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);
  
};
goog.inherits(lgb.integrated.model.unit.None, lgb.integrated.model.unit.UnitBase);




lgb.integrated.model.unit.None.prototype.getUnitDisplaySymbol = function() {
  
  return '';
  
};


lgb.integrated.model.unit.None.prototype.getPropertyDefaults = function() {
    
    debugger; //must implement
    
    var propertyDefaults = {
        min:0.00,
        max:99999.99,
        dflt:1.0
    };
    
    return propertyDefaults;
};



lgb.integrated.model.unit.None.prototype.getUnitVo = function() {
 
  return {};
  
};


lgb.integrated.model.unit.None.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  return internalValue;
  
};




lgb.integrated.model.unit.None.prototype.getUnitList_ = function() {
 
  return [

  ];
  
};




