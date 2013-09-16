/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.BaseView');

goog.require('lgb.world.model.ViewpointModel');
goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');
goog.require('lgb.scenario.model.System');
goog.require('lgb.scenario.model.SubSystem');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUIGUI}
 */
lgb.scenario.view.BaseView = function(dataModel, debugFlag) {
  this.disableIDs_ = true;
  this.setDebugFlag(debugFlag);
  
  this.cssClassName_ = 'input-' + this.getClassName();
  
  if (debugFlag) {
    this.cssClassName_ += 'Debug';
  }
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
};
goog.inherits(lgb.scenario.view.BaseView, lgb.gui.view.BaseGUI);


lgb.scenario.view.BaseView.prototype.setDebugFlag = function(debugFlag) {
  
  if (undefined == debugFlag) {
    this.debugFlag_ = false;
  } else {
    this.debugFlag_ = debugFlag;
  }

};

lgb.scenario.view.BaseView.prototype.setEnabled = function(debugFlag) {
  

   this.setEnabled = debugFlag;
  

};




  
lgb.scenario.view.BaseView.prototype.appendTitle_ = function() {
  
  var html = this.dataModel.name;
  
  if (this.debugFlag_) {
    html += " ({0})".format(this.dataModel.abbr);
  }
  
  this.append(html);
  
  
};


  
lgb.scenario.view.BaseView.prototype.makeChildren_ = function(parentElement) {
  
  this.each(this.dataModel.children_, this.appendChildTo_, parentElement);
  
};



lgb.scenario.view.BaseView.prototype.appendChildTo_ = function(childNode, parentElement) {
  

  var childClassName = childNode.getClassName();


  if ("description" == childClassName) {
    
    
  } else {

    var classConstructor = this.getClassConstructor();
    var childClassConstructor = classConstructor.childClassMap[childClassName];
    
    if(childClassConstructor) {
      var child = new childClassConstructor(childNode, this.debugFlag_);
      child.appendTo(parentElement);
      
    } else {
      debugger;
    }
  }
  
};


lgb.scenario.view.BaseView.prototype.appendDebugProperty_ = function(propertyName) {
  
  var value = this.dataModel[propertyName];
  
  if(null == value) {
    value = '{null}';
  }

  var html = "{0} : {1} <br />".format(propertyName, value);
  this.append(html);
  
};


