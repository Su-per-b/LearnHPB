/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.System');

goog.require('lgb.scenario.view.BaseView');
goog.require('lgb.scenario.view.SubSystem');


lgb.scenario.view.System = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.System, lgb.scenario.view.BaseView);



lgb.scenario.view.System.prototype.init = function() {
    this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.scenario.view.System.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);
  this.appendTitle_();
  this.makeChildrenAndListen_(parentElement);
};




lgb.scenario.view.System.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = $('<h1>');
    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};



lgb.scenario.view.System.childClassMap = {
    "SubSystem" : lgb.scenario.view.SubSystem
};


