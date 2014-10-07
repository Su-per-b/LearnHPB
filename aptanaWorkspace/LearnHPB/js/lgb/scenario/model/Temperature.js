/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Temperature');
goog.require('lgb.scenario.model.Decimal');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Temperature = function(node) {

  lgb.scenario.model.Decimal.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Temperature, lgb.scenario.model.Decimal);




lgb.scenario.model.Temperature.prototype.parseVar = function(realVar) {
  
  this.parseVarBase_(realVar);
  this.setPropertyDefaults_();
  this.updateDisplayUnits();
  
};


lgb.scenario.model.Temperature.prototype.setInternalValue = function(realVo) {
  
  this.value = parseFloat(realVo.value_);
  this.displayValue = this.convertToDisplayValue_(this.value);
  
};




// lgb.scenario.model.Temperature.prototype.updateDisplayUnits = function() {
//   
  // this.displayValue = this.convertToDisplayValue_(this.value);
  // this.displayUnit = this.getDisplayUnitString();
  // this.displayMin = this.getMin();
  // this.displayMax = this.getMax();
  // this.displayStart = this.getDefaultValue();
// 
// };


// lgb.scenario.model.Temperature.prototype.getDisplayUnitString = function() {
//   
//   
  // switch (this.displayUnitSystem.getIntValue()) {
//     
    // case lgb.simulation.model.DisplayUnitSystem.ENUM.SI : 
      // return "C";
      // break;
    // case lgb.simulation.model.DisplayUnitSystem.ENUM.IP : 
      // return "F";
      // break;
    // case lgb.simulation.model.DisplayUnitSystem.ENUM.INTERNAL : 
      // return "K";
      // break;
    // default :
      // debugger;
      // return null;
      // break;
  // }
// 
// 
// };


// 
// lgb.scenario.model.Temperature.prototype.convertToDisplayValue_ = function(internalValue) {
//   
  // switch (this.displayUnitSystem.getIntValue()) {
//     
    // case lgb.simulation.model.DisplayUnitSystem.ENUM.SI :
//     
      // var celsiusTemperature = internalValue - 273.15;
      // celsiusTemperature = celsiusTemperature.toFixed(1);
//       
      // return celsiusTemperature;
      // break;
    // case lgb.simulation.model.DisplayUnitSystem.ENUM.IP :
//     
      // var fahrenheitTemperature = 1.8 * (internalValue - 273) + 32;
      // fahrenheitTemperature = fahrenheitTemperature.toFixed(1);
//       
      // return fahrenheitTemperature;
      // break;
//       
    // case lgb.simulation.model.DisplayUnitSystem.ENUM.INTERNAL : 
      // return internalValue;
      // break;
    // default :
      // debugger;
      // return null;
      // break;
  // }
//   
// };


lgb.scenario.model.Temperature.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:250.00,
        max:325.00,
        dflt:295.15
    };
    
    return propertyDefaults;
};



