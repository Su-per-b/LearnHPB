goog.provide('lgb.integrated.model.unit.SecondsAfter2000');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.SecondsAfter2000 = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);

};
goog.inherits(lgb.integrated.model.unit.SecondsAfter2000, lgb.integrated.model.unit.UnitBase);






lgb.integrated.model.unit.SecondsAfter2000.prototype.convertDisplayToInternalValue = function(displayValue) {
  
    return displayValue;
  
};



lgb.integrated.model.unit.SecondsAfter2000.prototype.convertInternalToDisplayValue = function(internalValue) {
  
    return internalValue;
  
};



lgb.integrated.model.unit.SecondsAfter2000.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.SECOND,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.SECOND,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.SECOND
  ];
  
};
