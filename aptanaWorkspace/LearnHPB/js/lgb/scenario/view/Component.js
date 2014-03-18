/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Component');

goog.require('lgb.scenario.view.BaseView');


lgb.scenario.view.Component = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.Component, lgb.scenario.view.BaseView);




lgb.scenario.view.Component.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);
  
  this.append(
    'name : ' + this.dataModel.name
  );
  
    
};


/*

lgb.scenario.view.Component.childClassMap = {
  "Component" : lgb.scenario.view.Component,
  "Component" : lgb.scenario.view.Component
};

*/
