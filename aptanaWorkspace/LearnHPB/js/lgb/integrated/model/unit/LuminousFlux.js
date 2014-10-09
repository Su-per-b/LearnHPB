goog.provide('lgb.integrated.model.unit.LuminousFlux');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.LuminousFlux = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);
  
};
goog.inherits(lgb.integrated.model.unit.LuminousFlux, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.LuminousFlux.prototype.getPropertyDefaults = function() {
    
    debugger; //must implement
    
    var propertyDefaults = {
        min:0.00,
        max:99999.99,
        dflt:1.0
    };
    
    return propertyDefaults;
};





lgb.integrated.model.unit.LuminousFlux.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  return internalValue;
  
};



lgb.integrated.model.unit.LuminousFlux.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.LUMEN,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.LUMEN,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.LUMEN
  ];
  
};






