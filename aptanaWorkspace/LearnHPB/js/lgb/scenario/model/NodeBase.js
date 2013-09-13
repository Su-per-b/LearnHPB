/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.NodeBase');
goog.require('lgb.world.model.BaseModel');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.world.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.NodeBase = function(node) {
  
  this.node = node;
  
  var className = this.getClassName();
  
  if (null == node || className != node.tagName) {
      debugger;
  }
  
  this.classReference_ = eval(this.getFullClassName());
  
  lgb.world.model.BaseModel.call(this);
  
  this.parse_(node);
  this.node = null;
  
};
goog.inherits(lgb.scenario.model.NodeBase, lgb.world.model.BaseModel);


lgb.scenario.model.NodeBase.prototype.getChildren = function() {
  
  return this.children_;

};

lgb.scenario.model.NodeBase.prototype.makeChildren_ = function() {
  
  this.children_ = [];
  this.each(this.node.children, this.parseChild_);
};

lgb.scenario.model.NodeBase.prototype.parseChild_ = function(childNode) {
  
  var tagName = childNode.tagName;
  
  if ("description" == tagName) {
    
    this.description = childNode.textContent;
    
  }
  
  
  if ("description" == tagName) {
    
    this.description = childNode.textContent;
    
  } else {
    
    
    if (this.classReference_.childClassMap.hasOwnProperty()) {
      debugger;
    } else {
      var theClass = this.classReference_.childClassMap[tagName];
    }

    
    if(theClass) {
      var child = new theClass(childNode);
      this.children_.push(child);
    } else {
      debugger;
    }
  }
  
};


lgb.scenario.model.NodeBase.prototype.getAttribute = function(attributeName) {
  
  var node = this.node.attributes.getNamedItem(attributeName);
  
  if (node) {
    return node.nodeValue;
  } else {
    return null;
  }
   
};


lgb.scenario.model.NodeBase.prototype.setNameAndAbbr_ = function() {
    
    this.setPropertyStr_('name');
    this.setPropertyStr_('abbr');

};


lgb.scenario.model.NodeBase.prototype.setPropertyInt_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = parseInt(strValue);
  } else {
    this[propertyName] = null;
  }

};

lgb.scenario.model.NodeBase.prototype.setPropertyStr_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = String(strValue);
  } else {
    this[propertyName] = null;
  }

};

lgb.scenario.model.NodeBase.prototype.setPropertyFloat_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (strValue) {
    this[propertyName] = parseFloat(strValue);
  } else {
    this[propertyName] = null;
  }

};


lgb.scenario.model.NodeBase.prototype.setPropertyBool_ = function(propertyName) {
    
  var strValue = this.getAttribute(propertyName);
  if (undefined == strValue) {
    this[propertyName] = false;
  } else {
    
    if ("false" == strValue.toLowerCase()) {
      this[propertyName] = false;
    } else if ("true" == strValue.toLowerCase()) {
      this[propertyName] = true;
    } else {
      debugger;
    }
    
  }

};

