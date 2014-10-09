goog.provide('lgb.integrated.model.unit.LightingPowerDensity');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.LightingPowerDensity = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);
  
};
goog.inherits(lgb.integrated.model.unit.LightingPowerDensity, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.LightingPowerDensity.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:0.00,
        max:99999.99,
        dflt:1.0
    };
    
    return propertyDefaults;
};







lgb.integrated.model.unit.LightingPowerDensity.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  return internalValue;
  
};


lgb.integrated.model.unit.LightingPowerDensity.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.WATT_PER_SQUARE_METRE,
    lgb.integrated.model.unit.UnitBase.UNIT.IP.WATT_PER_SQUARE_FOOT,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.WATT_PER_SQUARE_METRE
  ];
  
};




