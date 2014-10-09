goog.provide('lgb.integrated.model.unit.Pressure');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.Pressure = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);
  
};
goog.inherits(lgb.integrated.model.unit.Pressure, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.Pressure.prototype.getPropertyDefaults = function() {
    
    debugger; //must implement
    
    var propertyDefaults = {
        min:250.00,
        max:325.00,
        dflt:295.15
    };
    
    return propertyDefaults;
};




lgb.integrated.model.unit.Pressure.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  return internalValue;
  

  
};


lgb.integrated.model.unit.Pressure.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.PASCAL,
    lgb.integrated.model.unit.UnitBase.UNIT.IP.FEET_OF_WATER_COLUMN,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.PASCAL
  ];
  
};



