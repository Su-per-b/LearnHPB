/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.SubSystem');

goog.require('lgb.scenario.view.BaseViewGUI');
goog.require('lgb.scenario.view.Category');



lgb.scenario.view.SubSystem = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.SubSystem, lgb.scenario.view.BaseViewGUI);


lgb.scenario.view.SubSystem.prototype.appendTo = function(parentElement) {
  
  this.injectTo(parentElement);
  this.appendTitle_();
  this.makeChildren_(parentElement);
  
};


lgb.scenario.view.SubSystem.childClassMap = {
    "Category" : lgb.scenario.view.Category,
    "Variable" : lgb.scenario.view.Variable
};

