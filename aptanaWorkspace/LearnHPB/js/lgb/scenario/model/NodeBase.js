/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.NodeBase');
goog.require('lgb.core.BaseModel');
goog.require('lgb.simulation.model.DisplayUnitSystem');

/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.NodeBase = function(node) {
  

  
  var className = this.getClassName();
  
  if (null == node || className != node.tagName) {
      //debugger;
  }
  
  this.classConstructor_ = this.getClassConstructor();
  
  lgb.core.BaseModel.call(this);
  
  this.displayUnitSystem = lgb.simulation.model.DisplayUnitSystem.getInstance();
  
  if (undefined != node) {
    this.node = node;
    this.parseXmlNode_();
    this.node = null;
  }

};
goog.inherits(lgb.scenario.model.NodeBase, lgb.core.BaseModel);





lgb.scenario.model.NodeBase.prototype.parseXmlNode_ = function() {
 
    debugger; //should override
    
};


lgb.scenario.model.NodeBase.prototype.setOneDefault_ = function(propName) {
 
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyFloat_(propName);
  
  if (null == this[propName]) {
      this[propName] = propertyDefaults[propName];
  }
  
    
};


lgb.scenario.model.NodeBase.prototype.getVarList = function() {
  
    var len = this.children_.length;
    
    var varList = [];
    
    for (var j = 0; j < len; j++) {
        
        var child = this.children_[j];
        var childVarList = child.getVarList();
        
        if(null != childVarList) {
            varList = childVarList.concat(varList);
        }
    }
    
    if (0 == varList.length ) {
        return null;
    } else {
        return varList;
    }

    
};


lgb.scenario.model.NodeBase.prototype.getChildren = function() {
  
  return this.children_;

};

lgb.scenario.model.NodeBase.prototype.makeChildrenAbbr_ = function() {
  
  //this.parentFqAbbr_ = parentFqAbbr;
  
  this.children_ = [];
  this.each(this.node.children, this.parseChild_);
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
    
    
    if (this.classConstructor_.childClassMap.hasOwnProperty()) {
      debugger;
    } else {
      var theClass = this.classConstructor_.childClassMap[tagName];
    }

    
    if(theClass) {
      var child = new theClass(childNode, this.fqAbbr);
      this.children_.push(child);
    } else {
      debugger;
    }
  }
  
};


lgb.scenario.model.NodeBase.prototype.getAttribute = function(attributeName) {
  
  if (null == this.node) {
      return null;
  } else {
      
      var node = this.node.attributes.getNamedItem(attributeName);
      
      if (null == node) {
        return null;
      } else {
        return node.nodeValue;
      }
      
  }
  
};


lgb.scenario.model.NodeBase.prototype.setNameAndAbbr_ = function() {
    
    this.setPropertyStr_('name');
    this.setPropertyStr_('abbr');

};


lgb.scenario.model.NodeBase.prototype.setPropertyInt_ = function(propertyName, defaultValue) {
   
  var strValue = this.getAttribute(propertyName);
  if (null == strValue) {
    this[propertyName] = defaultValue;
  } else {
    this[propertyName] = parseInt(strValue);
  }

};

lgb.scenario.model.NodeBase.prototype.setPropertyStr_ = function(propertyName, defaultValue) {
    
  var strValue = this.getAttribute(propertyName);
  
  if (null == strValue) {
    this[propertyName] = defaultValue;
  } else {
    this[propertyName] = String(strValue);
  }

};

lgb.scenario.model.NodeBase.prototype.setPropertyFloat_ = function(propertyName, defaultValue) {
    
  var strValue = this.getAttribute(propertyName);
  if (null == strValue) {
    this[propertyName] = parseFloat(defaultValue);
  } else {
    this[propertyName] = parseFloat(strValue);
  }

};


lgb.scenario.model.NodeBase.prototype.setPropertyBool_ = function(propertyName, defaultValue) {
    
  var strValue = this.getAttribute(propertyName);
  
  if (null == strValue) {
    this[propertyName] = defaultValue;
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



lgb.scenario.model.NodeBase.prototype.changeChildrenPropertyEx = function(propertyName, propertyValue) {
  
    this.each(this.children_, this.changeOneChildPropertyEx_, propertyName, propertyValue);
    
};

lgb.scenario.model.NodeBase.prototype.changeOneChildPropertyEx_ = function(child, propertyName, propertyValue) {

   // if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
   // }
};



lgb.scenario.model.NodeBase.prototype.changePropertyEx = function(propertyName, propertyValue) {

   // if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
   // }
};




lgb.scenario.model.NodeBase.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};




lgb.scenario.model.NodeBase.prototype.updateDisplayUnitSystem = function() {
  
    
    if (undefined != this.children_) {
      this.each(this.children_, this.updateOneDisplayUnitSystem_);
    }

    return;
};

lgb.scenario.model.NodeBase.prototype.updateOneDisplayUnitSystem_ = function(child) {
  
    child.updateDisplayUnitSystem();

};





lgb.scenario.model.NodeBase.prototype.setDisplayUnitSystem = function(displayUnitSystem) {
  
    this.changePropertyEx("displayUnitSystem", displayUnitSystem);
    
    if (undefined != this.children_) {
      this.each(this.children_, this.setChildDisplayUnitSystem_);
    }

    return;
};

lgb.scenario.model.NodeBase.prototype.setChildDisplayUnitSystem_ = function(child) {
  
    child.setDisplayUnitSystem(this.displayUnitSystem);
  
    return;
};












