/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.NodeBase');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');




lgb.integrated.view.NodeBase = function(dataModel, debugFlag) {
  this.disableIDs_ = true;
  this.setDebugFlag(debugFlag);
  
  this.cssClassName_ = 'input-' + this.getClassName();
  
  if (debugFlag) {
    this.cssClassName_ += 'Debug';
  }
  
  this.children_ = [];
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
};
goog.inherits(lgb.integrated.view.NodeBase, lgb.gui.view.BaseGUI);


lgb.integrated.view.NodeBase.prototype.setDebugFlag = function(debugFlag) {
  
  if (undefined == debugFlag) {
    this.debugFlag_ = false;
  } else {
    this.debugFlag_ = debugFlag;
  }

};

lgb.integrated.view.NodeBase.prototype.setEnabled = function(isEnabled) {
 
   this.setEnabled = isEnabled;

};




lgb.integrated.view.NodeBase.prototype.appendTitle_ = function() {
  
  var html = this.dataModel.name;
  
  if (this.debugFlag_) {
    html += " ({0})".format(this.dataModel.abbr);
  }
  
  this.append(html);
  
  
};




lgb.integrated.view.NodeBase.prototype.getDisplayUnit_ = function() {
  
  return null;
  
};



lgb.integrated.view.NodeBase.prototype.appendDebugProperty_ = function(propertyName) {
  
  var value = this.dataModel[propertyName];
  
  if(null == value) {
    value = '{null}';
  }

  var html = "{0} : {1} <br />".format(propertyName, value);
  this.append(html);
  
};



lgb.integrated.view.NodeBase.prototype.instantiateViewForModel_ = function(dataModel) {
    
    
    var ownClass = this.getClassConstructor();
    var map = ownClass.classModelViewMap;
      
    var fullClassName = dataModel.getFullClassName();
    var classReference = null;
    
    if ( map.hasOwnProperty(fullClassName)  ) {
        classReference = map[fullClassName];
        
        if (null == classReference) {
            debugger;
            return null;
        } else {
            goog.asserts.assertFunction(classReference);
            
            var destObj = new classReference(dataModel);
            return destObj;
        }

    } else {
        return null;
    }
    
 
};




