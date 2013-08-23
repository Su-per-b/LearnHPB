/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.NodeBase');
goog.require('lgb.model.BaseModel');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.NodeBase = function(node) {
  
  this.node = node;
  
  var className = this.getClassName();
  
  if (className != node.tagName) {
      debugger;
  }
  
  this.classReference_ = eval(this.getFullClassName());
  
  lgb.model.BaseModel.call(this);
  
  this.parse_(node);
  this.node = null;
  
};
goog.inherits(lgb.model.scenario.NodeBase, lgb.model.BaseModel);


lgb.model.scenario.NodeBase.prototype.getChildren = function() {
  
  return this.children_;

};

lgb.model.scenario.NodeBase.prototype.makeChildren_ = function() {
  
  this.children_ = [];
  this.each(this.node.children, this.parseChild_);
};

lgb.model.scenario.NodeBase.prototype.parseChild_ = function(childNode) {
  
  var tagName = childNode.tagName;
  
  if ("description" == tagName) {
    
    this.description = childNode.textContent;
    
  } else {
    
    var theClass = this.classReference_.childClassMap[tagName];
    
    if(theClass) {
      var child = new theClass(childNode);
      this.children_.push(child);
    } else {
      debugger;
    }
  }
  
};


lgb.model.scenario.NodeBase.prototype.getAttribute = function(attributeName) {
  
  var node = this.node.attributes.getNamedItem(attributeName);
  
  if (node) {
    return node.nodeValue;
  } else {
    return null;
  }
   
};


lgb.model.scenario.NodeBase.prototype.setNameAndAbbr_ = function() {
    
    this.setPropertyStr_('name');
    this.setPropertyStr_('abbr');

};


lgb.model.scenario.NodeBase.prototype.setPropertyInt_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = parseInt(strValue);
  } else {
    this[propertyName] = null;
  }

};

lgb.model.scenario.NodeBase.prototype.setPropertyStr_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = String(strValue);
  } else {
    this[propertyName] = null;
  }

};

lgb.model.scenario.NodeBase.prototype.setPropertyFloat_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = parseFloat(strValue);
  } else {
    this[propertyName] = null;
  }

};


lgb.model.scenario.NodeBase.prototype.setPropertyBool_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = Boolean(strValue);
  } else {
    this[propertyName] = null;
  }

};

