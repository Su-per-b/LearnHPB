/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.SubSystem');

goog.require('lgb.integrated.view.NodeBaseContainer');
goog.require('lgb.integrated.view.Category');
goog.require('lgb.scenario.model.tag.SubSystem');


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


//for children
lgb.integrated.view.SubSystem.prototype.getModelViewClassMap_ = function() {
  
    return {
        "lgb.integrated.model.Category" : lgb.integrated.view.Category
    };
};
