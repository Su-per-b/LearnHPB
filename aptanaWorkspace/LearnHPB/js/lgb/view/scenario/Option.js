/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Option');

goog.require('lgb.view.scenario.BaseViewGUI');


lgb.view.scenario.Option = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.Option, lgb.view.scenario.BaseViewGUI);



lgb.view.scenario.Option.prototype.appendTo = function(parentElement) {

  this.injectTo(parentElement);  
  this.appendDebugProperty_('name');
  this.appendDebugProperty_('disabled');
  this.appendDebugProperty_('default');
  
};



