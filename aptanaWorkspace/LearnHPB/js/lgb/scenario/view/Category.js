/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Category');

goog.require('lgb.scenario.view.BaseView');
goog.require('lgb.scenario.view.Variable');
goog.require('lgb.scenario.view.Component');


lgb.scenario.view.Category = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
};

goog.inherits(lgb.scenario.view.Category, lgb.scenario.view.BaseView);




lgb.scenario.view.Category.prototype.appendTo = function(parentElement) {
  
  this.injectTo(parentElement);  
  this.appendTitle_();
  this.append('<br />');
  
  this.makeChildren_(parentElement);
  
};


lgb.scenario.view.Category.childClassMap = {
  "Variable" : lgb.scenario.view.Variable,
  "Component" : lgb.scenario.view.Component
};

