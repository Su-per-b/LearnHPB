/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Decimal');
goog.require('lgb.scenario.model.NodeBase');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Decimal = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  // this.displayUnitSystem = lgb.simulation.model.DisplayUnitSystem.getInstance();

  
};
goog.inherits(lgb.scenario.model.Decimal, lgb.scenario.model.NodeBase);



lgb.scenario.model.Decimal.prototype.parseXmlNode_ = function() {
    
    this.setPropertyDefaults_();
  
};


lgb.scenario.model.Decimal.prototype.setPropertyDefaults_ = function() {
  
  var propertyDefaultsObj = this.getPropertyDefaults();
  
  this.setPropertyFloat_('min', propertyDefaultsObj.min);
  this.setPropertyFloat_('max', propertyDefaultsObj.max);
  this.setPropertyFloat_('dflt', propertyDefaultsObj.dflt);
  
};


lgb.scenario.model.Decimal.prototype.parseVarBase_ = function(realVar) {

  this.max = realVar.typeSpecReal_.max;
  this.min = realVar.typeSpecReal_.min;
  this.dflt = realVar.typeSpecReal_.start;
  this.description = realVar.description_;
  this.name = realVar.name_;
  this.causality = realVar.causality_;
  this.idx = realVar.idx_;
  this.variability = realVar.variability_;
  this.valueReference = realVar.valueReference_;
  this.value = 0;
  this.unit = realVar.getUnit();
    
};



lgb.scenario.model.Decimal.prototype.parseVar = function(realVar) {
  
  this.parseVarBase_(realVar);
  this.setPropertyDefaults_();
  
  this.updateDisplayUnits();
  
};


lgb.scenario.model.Decimal.prototype.getDefaultValue = function() {
  
  return this.convertToDisplayValue_(this.dflt);
  
};



lgb.scenario.model.Decimal.prototype.getMin = function(node) {
  
  return this.convertToDisplayValue_(this.min);
  
};


lgb.scenario.model.Decimal.prototype.getMax = function(node) {
  
  return this.convertToDisplayValue_(this.max);
  
};

lgb.scenario.model.Decimal.prototype.convertToDisplayValue_ = function(internalValue) {
  
  return internalValue;
  
};

lgb.scenario.model.Decimal.prototype.getDisplayUnitString = function() {
  
  
    return this.unit;


};


lgb.scenario.model.Decimal.prototype.updateDisplayUnits = function() {
  
  this.displayValue = this.convertToDisplayValue_(this.value);
  this.displayUnit = this.getDisplayUnitString();
  this.displayMin = this.getMin();
  this.displayMax = this.getMax();
  this.displayStart = this.getDefaultValue();

};



lgb.scenario.model.Decimal.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        min:0.00,
        max:999.00,
        dflt:1.00
    };
    
    return propertyDefaults;
};




