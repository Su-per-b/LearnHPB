/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.SystemList');
goog.require('lgb.model.scenario.NodeBase');

goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.model.scenario.System');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.SystemList = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.SystemList, lgb.model.scenario.NodeBase);



lgb.model.scenario.SystemList.prototype.parse_ = function(node) {
  this.setPropertyStr_('name');
  this.systemMap_ = {};
  
  this.makeChildren_();
  
};


lgb.model.scenario.SystemList.prototype.parseChild_ = function(childNode) {
  
    goog.base(this, 'parseChild_', childNode);
    
    
    var childObj = this.children_[this.children_.length-1];
    
    if (this.systemMap_.hasOwnProperty(childObj.name)) {
      debugger;
    } else {
      this.systemMap_[childObj.name] = childObj;
    }

};


lgb.model.scenario.SystemList.prototype.getSystem = function(name) {
  
    if (this.systemMap_.hasOwnProperty(name)) {
      return this.systemMap_[name];
    } else {
      debugger;
    }
    
};



lgb.model.scenario.SystemList.childClassMap = {
    "System" : lgb.model.scenario.System
};


