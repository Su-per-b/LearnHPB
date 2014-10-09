/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.System');

goog.require('lgb.integrated.view.NodeBaseContainer');
goog.require('lgb.integrated.view.SubSystem');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.System = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseContainer.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.System, lgb.integrated.view.NodeBaseContainer);



lgb.integrated.view.System.prototype.init = function() {
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.integrated.view.System.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {
    
    var nodes = this.getLeafNodes();
    
    if (null != nodes) {
        this.eachHandlerName(nodes, 'changeDisplayUnitSystem', displayUnitSystem);
    }

    return;
};



lgb.integrated.view.System.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);
  this.appendTitle_();
  this.makeChildrenAndListen_(parentElement);
};




lgb.integrated.view.System.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = $('<h1>');
    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};


lgb.integrated.view.System.classModelViewMap = {
    "lgb.integrated.model.SubSystem" : lgb.integrated.view.SubSystem
};
