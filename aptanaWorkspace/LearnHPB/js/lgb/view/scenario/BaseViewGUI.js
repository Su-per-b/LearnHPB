/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.BaseViewGUI');

goog.require('lgb.model.ViewpointModel');
goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');
goog.require('lgb.model.scenario.System');
goog.require('lgb.model.scenario.SubSystem');


/**
 * @constructor
 * @param {lgb.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUIGUI}
 */
lgb.view.scenario.BaseViewGUI = function(dataModel, debugFlag) {
  this.disableIDs_ = true;
  this.setDebugFlag(debugFlag);
  
  this.cssClassName_ = 'input-' + this.getClassName();
  
  if (debugFlag) {
    this.cssClassName_ += 'Debug';
  }
  
  lgb.view.input.BaseViewGUI.call(this, dataModel);
};
goog.inherits(lgb.view.scenario.BaseViewGUI, lgb.view.input.BaseViewGUI);


lgb.view.scenario.BaseViewGUI.prototype.setDebugFlag = function(debugFlag) {
  
  if (undefined == debugFlag) {
    this.debugFlag_ = false;
  } else {
    this.debugFlag_ = debugFlag;
  }

};

lgb.view.scenario.BaseViewGUI.prototype.makeChildren_ = function(parentElement) {
  
  this.each(this.dataModel.children_, this.appendChildTo_, parentElement);
  
};


/*
lgb.view.scenario.BaseViewGUI.prototype.appendChildTo_ = function(childNode) {
  
  
  var childClassName = childNode.getClassName();
  var fullClassName = this.getFullClassName();
  
  if ("description" == childClassName) {
    
    
  } else {

    var staticClass = eval(fullClassName);
    var classConstructor = staticClass.childClassMap[childClassName];
    
    if(classConstructor) {
      var child = new classConstructor(childNode);
      child.appendTo(this.getMainElement(), this.debugFlag_);
    } else {
      debugger;
    }
  }
  
};
*/


lgb.view.scenario.BaseViewGUI.prototype.appendChildTo_ = function(childNode, parentElement) {
  

  var childClassName = childNode.getClassName();


  if ("description" == childClassName) {
    
    
  } else {

    var classConstructor = this.getClassConstructor()
    var childClassConstructor = classConstructor.childClassMap[childClassName];
    
    if(childClassConstructor) {
      var child = new childClassConstructor(childNode, this.debugFlag_);
      child.appendTo(parentElement);
      
    } else {
      debugger;
    }
  }
  
};


lgb.view.scenario.BaseViewGUI.prototype.appendDebugProperty_ = function(propertyName) {
  
  var value = this.dataModel[propertyName];
  
  if(null == value) {
    value = '{null}';
  }

  var html = "{0} : {1} <br />".format(propertyName, value);
  this.append(html);
  
};


