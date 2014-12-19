/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.VariableOption');

goog.require('lgb.integrated.view.NodeBaseLeaf');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.VariableOption = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseLeaf.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.VariableOption, lgb.integrated.view.NodeBaseLeaf);



lgb.integrated.view.VariableOption.prototype.appendTo = function(parentElement) {

  this.injectInto(parentElement);  
  this.appendDebugProperty_('name');
  this.appendDebugProperty_('disabled');
  this.appendDebugProperty_('start');
  
};



