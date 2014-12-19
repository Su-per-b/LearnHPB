/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Temperature');
goog.require('lgb.scenario.model.Real');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Temperature = function(node) {

  lgb.scenario.model.Real.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Temperature, lgb.scenario.model.Real);




lgb.scenario.model.Temperature.prototype.parseVar = function(realVar) {
  
  this.parseVarBase_(realVar);
  this.setPropertyDefaults_();
  this.updateDisplayUnits();
  
};


lgb.scenario.model.Temperature.prototype.setInternalValue = function(realVo) {
  
  this.value = parseFloat(realVo.value_);
  this.displayValue = this.convertToDisplayValue_(this.value);
  
};



lgb.scenario.model.Temperature.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:250.00,
        max:325.00,
        dflt:295.15
    };
    
    return propertyDefaults;
};



