/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.NodeBase');

goog.require('lgb.core.BaseModel');

goog.require('lgb.scenario.model.attribute.String');
goog.require('lgb.scenario.model.attribute.Real');
goog.require('lgb.scenario.model.attribute.Boolean');

/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.NodeBase = function(node, parentTag) {
  

  if (undefined != parentTag) {
      this.parentTag_ = parentTag;
  }
  
  var className = this.getClassName();
  
  if (null == node || className != node.tagName) {
      //debugger;
  }
  
  this.classConstructor_ = this.getClassConstructor();
  
  lgb.core.BaseModel.call(this);

  
  if (undefined != node) {
    this.node = node;
    this.parseXmlNode_();
    this.node = null;
  }

};
goog.inherits(lgb.scenario.model.tag.NodeBase, lgb.core.BaseModel);


lgb.scenario.model.tag.NodeBase.prototype.parseXmlNode_ = function() {
  
  if (undefined != this.classConstructor_.attributeMap) {
    this.makeAttributes_();
  };
  
  if (undefined != this.classConstructor_.childMap) {
    this.makeChildren_();
  };

    
};



lgb.scenario.model.tag.NodeBase.prototype.makeAttributes_ = function() {
    
  var map = this.classConstructor_.attributeMap;
  this.eachPropertyName(map, this.makeOneAttribute_);
  
};


lgb.scenario.model.tag.NodeBase.prototype.makeOneAttribute_ = function(attributeInfo, attributeName) {
    
  var strValue = this.getAttribute(attributeName);
  
  if (null == strValue) {
      
      //use parent attribute if available
      if (undefined != this.parentTag_) {
          strValue = this.parentTag_.getAttribute(attributeName);
      }
      
      //if there is still now value defined then throw error if required
      if (null == strValue && true == attributeInfo.isRequired) {
        var errorMsg = attributeName + " is required";
        lgb.logSevere( errorMsg ) ;
        debugger;
      }
  
  }
  
  var convertedValue = attributeInfo.classReference.getValue(
    strValue,
    attributeInfo
  );
    
  this[attributeName] = convertedValue;
    

    return;
  
};


lgb.scenario.model.tag.NodeBase.prototype.makeChildren_ = function() {
  

  if (this.node.children.length > 0) {
      this.childMap_ = {};
      this.children_ = [];
      this.each(this.node.children, this.makeOneChild_);
  }

};



lgb.scenario.model.tag.NodeBase.prototype.makeOneChild_ = function(childNode) {
  
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
        child = new classReference(childNode, this);
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





lgb.scenario.model.tag.NodeBase.prototype.setOneDefault_ = function(propName) {
 
  var propertyDefaults = this.getPropertyDefaults();
  this.setPropertyFloat_(propName);
  
  if (null == this[propName]) {
      this[propName] = propertyDefaults[propName];
  }
  
    
};




lgb.scenario.model.tag.NodeBase.prototype.getChildren = function(childMapKey) {

	if (undefined == childMapKey) {
		return this.children_;
	} else {
	    
        if (undefined == this.childMap_) {
            return undefined;
        } else {
            if (this.childMap_.hasOwnProperty(childMapKey)) {
    
                var childList = this.childMap_[childMapKey];
                return childList;
    
            } else {
    
                //var errorMsg = this.getClassName() + ' has no child list named: ' + childMapKey;
                //console.error(errorMsg); debugger;
                return undefined;
            }
                
        }
	}

};




// lgb.scenario.model.tag.NodeBase.prototype.makeChildrenAbbr_ = function() {
//   
  // //this.parentFqAbbr_ = parentFqAbbr;
//   
  // this.children_ = [];
  // this.each(this.node.children, this.parseChild_);
// };
// 



lgb.scenario.model.tag.NodeBase.prototype.parseChild_ = function(childNode) {
  

	var tagName = childNode.tagName;
	var theClass, child;
    var map = this.classConstructor_.childClassMap;
    
    if (undefined == map) {
        debugger;
    }
    
	if (map.hasOwnProperty()) { 
	    debugger;
	} else {
		theClass = map[tagName];
	}

	if (theClass) {
		child = new theClass(childNode, this.fqAbbr);
		this.children_.push(child);
	} else { 
	    debugger;
	}

	return;

};


lgb.scenario.model.tag.NodeBase.prototype.getAttribute = function(attributeName) {
  
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



lgb.scenario.model.tag.NodeBase.prototype.changeChildrenPropertyEx = function(propertyName, propertyValue) {
  
    this.each(this.children_, this.changeOneChildPropertyEx_, propertyName, propertyValue);
    
};

lgb.scenario.model.tag.NodeBase.prototype.changeOneChildPropertyEx_ = function(child, propertyName, propertyValue) {

   // if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
   // }
};



lgb.scenario.model.tag.NodeBase.prototype.changePropertyEx = function(propertyName, propertyValue) {

   // if (this[propertyName] != propertyValue) {
        this[propertyName] = propertyValue;
        this.dispatchChangedEx(propertyName, propertyValue);
   // }
};




lgb.scenario.model.tag.NodeBase.prototype.dispatchChangedEx = function(propertyName, payload) {
   
   var whatIsDirty = {};
   whatIsDirty[propertyName] = payload;
   
   this.triggerLocal(e.DataModelChangedEx, whatIsDirty);
  
};




lgb.scenario.model.tag.NodeBase.prototype.updateDisplayUnitSystem = function() {
  
    
    if (undefined != this.children_) {
      this.each(this.children_, this.updateOneDisplayUnitSystem_);
    }

    return;
};

lgb.scenario.model.tag.NodeBase.prototype.updateOneDisplayUnitSystem_ = function(child) {
  
    child.updateDisplayUnitSystem();

};





lgb.scenario.model.tag.NodeBase.prototype.setDisplayUnitSystem = function(displayUnitSystem) {
  
    this.changePropertyEx("displayUnitSystem", displayUnitSystem);
    
    if (undefined != this.children_) {
      this.each(this.children_, this.setChildDisplayUnitSystem_);
    }

    return;
};

lgb.scenario.model.tag.NodeBase.prototype.setChildDisplayUnitSystem_ = function(child) {
  
    child.setDisplayUnitSystem(this.displayUnitSystem);
  
    return;
};






