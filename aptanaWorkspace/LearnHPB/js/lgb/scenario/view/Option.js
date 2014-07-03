/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Option');

goog.require('lgb.scenario.view.BaseView');


/**
 * @constructor
 * @extends {lgb.scenario.view.BaseView}
 */
lgb.scenario.view.Option = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.Option, lgb.scenario.view.BaseView);



lgb.scenario.view.Option.prototype.appendTo = function(parentElement) {

  this.injectInto(parentElement);  
  this.appendDebugProperty_('name');
  this.appendDebugProperty_('disabled');
  this.appendDebugProperty_('default');
  
};



