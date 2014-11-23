/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.VariableList');

goog.require('lgb.scenario.model.NodeBase');
goog.require('lgb.scenario.model.Variable');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.VariableList = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.VariableList, lgb.scenario.model.NodeBase);



lgb.scenario.model.VariableList.prototype.parseXmlNode_ = function() {
    
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyStr_('name', propertyDefaults.name);
  
  this.makeChildren_();
  
};




lgb.scenario.model.VariableList.prototype.getSystem = function(name) {
  
    if (this.systemMap_.hasOwnProperty(name)) {
      return this.systemMap_[name];
    } else {
      debugger;
    }
    
};



lgb.scenario.model.VariableList.childClassMap = {
    "System" : lgb.scenario.model.System
};


lgb.scenario.model.VariableList.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        name:"{name not set}"
    };
    
    return propertyDefaults;
};


lgb.scenario.model.VariableList.childClassMap = {
    "Variable" : lgb.scenario.model.Variable
};
