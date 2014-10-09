goog.provide('lgb.integrated.model.unit.Length');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.Length = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);
  
};
goog.inherits(lgb.integrated.model.unit.Length, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.Length.prototype.getPropertyDefaults = function() {
    
    debugger; //must implement
    
    var propertyDefaults = {
        min:0.00,
        max:99999.99,
        dflt:1.0
    };
    
    return propertyDefaults;
};






lgb.integrated.model.unit.Length.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  return internalValue;
  
};




lgb.integrated.model.unit.Length.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.METRE,
    lgb.integrated.model.unit.UnitBase.UNIT.IP.FOOT,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.METRE
  ];
  
};




