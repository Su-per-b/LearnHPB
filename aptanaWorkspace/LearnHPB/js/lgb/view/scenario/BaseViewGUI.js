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
lgb.view.scenario.BaseViewGUI = function(dataModel) {
  
  lgb.view.input.BaseViewGUI.call(this, dataModel);
};
goog.inherits(lgb.view.scenario.BaseViewGUI, lgb.view.input.BaseViewGUI);



lgb.view.scenario.BaseViewGUI.prototype.makeChildren_ = function(el, debugFlag) {
  
  this.each(this.dataModel.children_, this.appendChildTo_, el, debugFlag);
  
};



lgb.view.scenario.BaseViewGUI.prototype.appendChildTo_ = function(childNode, el, debugFlag) {
  
  var childClassName = childNode.getClassName();
  var fullClassName = this.getFullClassName();
  
  if ("description" == childClassName) {
    
    
  } else {

    var staticClass = eval(fullClassName);
    var classConstructor = staticClass.childClassMap[childClassName];
    
    if(classConstructor) {
      var child = new classConstructor(childNode);
      child.appendTo(el, debugFlag);
      
    } else {
      debugger;
    }
  }
  
};


