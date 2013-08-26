/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Component');

goog.require('lgb.view.scenario.BaseViewGUI');


lgb.view.scenario.Component = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.Component, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Component.prototype.appendTo = function(parentElement) {
  
  this.inject(parentElement);
  
  this.append(
    'name : ' + this.dataModel.name
  );
  
    
};


/*

lgb.view.scenario.Component.childClassMap = {
  "Component" : lgb.view.scenario.Component,
  "Component" : lgb.view.scenario.Component
};

*/
