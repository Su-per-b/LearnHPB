goog.provide('lgb.integrated.model.unit.ElectricalPower');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.ElectricalPower = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);
  
};
goog.inherits(lgb.integrated.model.unit.ElectricalPower, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.ElectricalPower.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:0.00,
        max:99999.99,
        start:1.0
    };
    
    return propertyDefaults;
};





lgb.integrated.model.unit.ElectricalPower.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  return internalValue;
  
};



lgb.integrated.model.unit.ElectricalPower.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.WATT,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.WATT,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.WATT
  ];
  
};


