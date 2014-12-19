goog.provide('lgb.integrated.model.unit.Temperature');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.Temperature = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);

  
};
goog.inherits(lgb.integrated.model.unit.Temperature, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.Temperature.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:250.00,
        max:325.00,
        start:295.15
    };
    
    return propertyDefaults;
};



lgb.integrated.model.unit.Temperature.prototype.convertDisplayToInternalValue = function(displayValue) {
  
  switch (this.displayUnitSystem_.getIntValue()) {
    
    case lgb.integrated.model.DisplayUnitSystem.ENUM.SI :
        //K = °C + 273.15
      var kelvinValue = displayValue + 273.15;
      
      return kelvinValue;
      break;
    case lgb.integrated.model.DisplayUnitSystem.ENUM.IP :
      //K = °F - 32 / 1.8 + 273.15
      var kelvinValue = displayValue - 32 / 1.8 + 273.15;
      return kelvinValue;
      break;
      
    case lgb.integrated.model.DisplayUnitSystem.ENUM.INTERNAL : 
      return displayValue;
      break;
    default :
      debugger;
      return null;
      break;
  }
  
};



lgb.integrated.model.unit.Temperature.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  switch (this.displayUnitSystem_.getIntValue()) {
    
    case lgb.integrated.model.DisplayUnitSystem.ENUM.SI :
        //°C = K - 273.15
      var celsiusTemperature = internalValue - 273.15;
      //celsiusTemperature = celsiusTemperature.toFixed(1);
      
      return celsiusTemperature;
      break;
    case lgb.integrated.model.DisplayUnitSystem.ENUM.IP :
      //°F = 1.8 * (K - 273) + 32;
      var fahrenheitTemperature = 1.8 * (internalValue - 273) + 32;
      //fahrenheitTemperature = fahrenheitTemperature.toFixed(1);
      
      return fahrenheitTemperature;
      break;
      
    case lgb.integrated.model.DisplayUnitSystem.ENUM.INTERNAL : 
      return internalValue;
      break;
    default :
      debugger;
      return null;
      break;
  }
  
};



lgb.integrated.model.unit.Temperature.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.CELSIUS,
    lgb.integrated.model.unit.UnitBase.UNIT.IP.FAHRENHEIT,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.KELVIN
  ];
  
};









