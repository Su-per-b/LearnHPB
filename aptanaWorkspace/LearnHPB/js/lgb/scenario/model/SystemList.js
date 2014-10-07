/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.SystemList');
goog.require('lgb.scenario.model.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.scenario.model.System');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.SystemList = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.SystemList, lgb.scenario.model.NodeBase);



lgb.scenario.model.SystemList.prototype.parseXmlNode_ = function() {
    
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyStr_('name', propertyDefaults.name);
  
  this.systemMap_ = {};
  this.makeChildren_();
  
};



lgb.scenario.model.SystemList.prototype.parseChild_ = function(childNode) {
  
    goog.base(this, 'parseChild_', childNode);
    
    
    var childObj = this.children_[this.children_.length-1];
    
    if (this.systemMap_.hasOwnProperty(childObj.name)) {
      debugger;
    } else {
      this.systemMap_[childObj.name] = childObj;
    }

};


lgb.scenario.model.SystemList.prototype.getSystem = function(name) {
  
    if (this.systemMap_.hasOwnProperty(name)) {
      return this.systemMap_[name];
    } else {
      debugger;
    }
    
};



lgb.scenario.model.SystemList.childClassMap = {
    "System" : lgb.scenario.model.System
};


lgb.scenario.model.SystemList.prototype.getPropertyDefaults = function() {
    
    var propertyDefaults = {
        name:"{name not set}"
    };
    
    return propertyDefaults;
};


