goog.provide('lgb.integrated.model.unit.VolumetricFlowRate');

goog.require('lgb.integrated.model.unit.UnitBase');



 /**
 * @constructor
 */
lgb.integrated.model.unit.VolumetricFlowRate = function(  ) {
    
  lgb.integrated.model.unit.UnitBase.call(this);

  
};
goog.inherits(lgb.integrated.model.unit.VolumetricFlowRate, lgb.integrated.model.unit.UnitBase);





lgb.integrated.model.unit.VolumetricFlowRate.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:250.00,
        max:325.00,
        start:295.15
    };
    
    return propertyDefaults;
};




lgb.integrated.model.unit.VolumetricFlowRate.prototype.convertInternalToDisplayValue = function(internalValue) {
  
  switch (this.displayUnitSystem_.getIntValue()) {
    
    case lgb.integrated.model.DisplayUnitSystem.ENUM.SI :
    
      var celsiusVolumetricFlowRate = internalValue - 273.15;
      //celsiusVolumetricFlowRate = celsiusVolumetricFlowRate.toFixed(1);
      
      return celsiusVolumetricFlowRate;
      break;
    case lgb.integrated.model.DisplayUnitSystem.ENUM.IP :
    
      var fahrenheitVolumetricFlowRate = 1.8 * (internalValue - 273) + 32;
      //fahrenheitVolumetricFlowRate = fahrenheitVolumetricFlowRate.toFixed(1);
      
      return fahrenheitVolumetricFlowRate;
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



lgb.integrated.model.unit.VolumetricFlowRate.prototype.getUnitList_ = function() {
 
  return [
    lgb.integrated.model.unit.UnitBase.UNIT.SI.CUBIC_METRE_PER_SECOND,
    lgb.integrated.model.unit.UnitBase.UNIT.IP.CUBIC_FEET_PER_MINUTE,
    lgb.integrated.model.unit.UnitBase.UNIT.SI.CUBIC_METRE_PER_SECOND
  ];
  
};









