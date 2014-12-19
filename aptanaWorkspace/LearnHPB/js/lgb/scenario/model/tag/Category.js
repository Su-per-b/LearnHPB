/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.Category');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.scenario.model.tag.Variable');
goog.require('lgb.scenario.model.Component');
goog.require('lgb.scenario.model.tag.VariableReference');




/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.Category = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.Category, lgb.scenario.model.tag.NodeBase);


lgb.scenario.model.tag.Category.prototype.parseXmlNode_ = function() {
  
  if (undefined != this.classConstructor_.attributeMap) {
    this.makeAttributes_();
  };
  
  if (undefined != this.classConstructor_.childMap) {
    this.makeChildren_();
  };

    
};

lgb.scenario.model.tag.Category.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    }

};

lgb.scenario.model.tag.Category.prototype.makeChildren_ = function() {
  

  if (this.node.children.length > 0) {
      this.childMap_ = {};
      this.children_ = [];
      this.each(this.node.children, this.makeOneChild_);
  }

};


lgb.scenario.model.tag.Category.prototype.makeOneChild_ = function(childNode) {
  
    var tagName = childNode.tagName;
    var classReference, child, mapEntry;
    
    var map = this.classConstructor_.childMap;
    
    if (undefined == map) {
        debugger;
    }
    
    if (!map.hasOwnProperty(tagName)) { 
        debugger;
    } else {
        mapEntry = map[tagName];
    }

    if (mapEntry) {
        classReference = mapEntry.classReference;
        child = new classReference(childNode);
    } else {
        debugger;
    }

    if (!this.childMap_.hasOwnProperty(tagName)) { 
        this.childMap_[tagName] = [];
    }
    
    this.childMap_[tagName].push(child);
    this.children_.push(child);


    return;

};


lgb.scenario.model.tag.Category.childMap = {

    "VariableReference" : {
        classReference:lgb.scenario.model.tag.VariableReference,
        isRequired:false
    }

    
};
