/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Variable');
goog.require('lgb.scenario.model.NodeBase');

goog.require('lgb.scenario.model.Integer');
goog.require('lgb.scenario.model.OptionList');
goog.require('lgb.scenario.model.Decimal');
goog.require('lgb.scenario.model.Boolean');
goog.require('lgb.scenario.model.Temperature');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Variable = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Variable, lgb.scenario.model.NodeBase);


lgb.scenario.model.Variable.prototype.getVarList = function() {

    return [this];
    
};




lgb.scenario.model.Variable.prototype.setMergedVariable = function(mergedVariable) {
    
    this.mergedVariable_ = mergedVariable;
    
    return;
    
};



lgb.scenario.model.Variable.prototype.parseXmlNode_ = function() {
  

  var propertyDefaults = this.getPropertyDefaults();
  
  this.setNameAndAbbr_();
  this.setPropertyStr_('scope', propertyDefaults.scope);
  
  this.setPropertyStr_('phase', propertyDefaults.phase);
  
  this.setPropertyStr_('variability', propertyDefaults.variability);
  this.setPropertyStr_('unit', propertyDefaults.unit);
  this.setPropertyStr_('modName', propertyDefaults.modName);

  this.makeChildren_();
  
};


lgb.scenario.model.Variable.prototype.getPropertyNames = function() {
  
  return   ['name', 'abbr', 'scope', 'phase', 'variability', 'unit', 'modName'];
};




lgb.scenario.model.Variable.childClassMap = {
    "Integer" : lgb.scenario.model.Integer,
    "OptionList" : lgb.scenario.model.OptionList,
    "Decimal" : lgb.scenario.model.Decimal,
    "Boolean" : lgb.scenario.model.Boolean,
    "Temperature" : lgb.scenario.model.Temperature
};
  

lgb.scenario.model.Variable.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        name:"",
        scope:"",
        phase:"",
        variability:"",
        unit:"",
        modName:""
    };
    
    return propertyDefaults;
};


