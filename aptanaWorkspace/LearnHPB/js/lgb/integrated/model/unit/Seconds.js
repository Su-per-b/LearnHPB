goog.provide('lgb.integrated.model.unit.Seconds');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.Seconds = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);

};
goog.inherits(lgb.integrated.model.unit.Seconds, lgb.integrated.model.unit.UnitBase);






lgb.integrated.model.unit.Seconds.prototype.convertDisplayToInternalValue = function(displayValue) {
  
    return displayValue;
  
};



lgb.integrated.model.unit.Seconds.prototype.convertInternalToDisplayValue = function(internalValue) {
  
    return internalValue;
  
};



lgb.integrated.model.unit.Seconds.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.SECOND,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.SECOND,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.SECOND
  ];
  
};
