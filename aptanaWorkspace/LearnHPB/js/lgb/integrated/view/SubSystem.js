/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.SubSystem');

goog.require('lgb.integrated.view.NodeBaseContainer');
goog.require('lgb.integrated.view.Category');
goog.require('lgb.integrated.view.VariableReal');



/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.SubSystem = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseContainer.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.SubSystem, lgb.integrated.view.NodeBaseContainer);


lgb.integrated.view.SubSystem.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);
  this.appendTitle_();
  this.makeChildrenAndListen_(parentElement);
  
};





lgb.integrated.view.SubSystem.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = $('<h2>');
    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};



lgb.integrated.view.SubSystem.classModelViewMap = {
    "lgb.integrated.model.Category" : lgb.integrated.view.Category,
    "lgb.integrated.model.VariableReal" : lgb.integrated.view.VariableReal
};