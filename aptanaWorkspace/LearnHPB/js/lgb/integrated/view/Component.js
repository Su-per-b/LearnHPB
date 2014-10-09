/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.Component');

goog.require('lgb.integrated.view.NodeBaseContainer');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.Component = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseContainer.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.Component, lgb.integrated.view.NodeBaseContainer);




lgb.integrated.view.Component.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);
  
  this.append(
    'name : ' + this.dataModel.name
  );
  
    
};


