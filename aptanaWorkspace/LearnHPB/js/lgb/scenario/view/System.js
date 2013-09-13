/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.System');

goog.require('lgb.scenario.view.BaseViewGUI');
goog.require('lgb.scenario.view.SubSystem');


lgb.scenario.view.System = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.System, lgb.scenario.view.BaseViewGUI);



lgb.scenario.view.System.prototype.init = function() {
    this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.scenario.view.System.prototype.appendTo = function(parentElement) {
  
  this.injectTo(parentElement);
  this.appendTitle_();
  this.makeChildren_(parentElement);
};


lgb.scenario.view.System.childClassMap = {
    "SubSystem" : lgb.scenario.view.SubSystem
};

