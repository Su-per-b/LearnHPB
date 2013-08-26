/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.SubSystem');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Category');



lgb.view.scenario.SubSystem = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.SubSystem, lgb.view.scenario.BaseViewGUI);


lgb.view.scenario.SubSystem.prototype.appendTo = function(parentElement) {
  
  this.inject(parentElement);
  this.append(this.dataModel.name);
  this.makeChildren_(parentElement);
  
};


lgb.view.scenario.SubSystem.childClassMap = {
    "Category" : lgb.view.scenario.Category,
    "Variable" : lgb.view.scenario.Variable
};

