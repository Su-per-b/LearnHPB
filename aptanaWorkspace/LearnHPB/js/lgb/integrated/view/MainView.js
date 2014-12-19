/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.MainView');

goog.require('lgb.integrated.view.NodeBase');
goog.require('lgb.integrated.view.System');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.MainView = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBase.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.MainView, lgb.integrated.view.NodeBase);



lgb.integrated.view.MainView.prototype.init = function() {
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.integrated.view.MainView.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {
    
    var nodes = this.getLeafNodes();
    
    
    if (undefined != this.children_) {
      this.each(this.children_, this.updateOneDisplayUnitMainView_);
    }

    return;
};

lgb.integrated.view.MainView.updateOneDisplayUnitMainView_ = function(child) {
  
    child.updateDisplayUnitMainView();

};




lgb.integrated.view.MainView.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);
  this.appendTitle_();
  this.makeChildrenAndListen_(parentElement);
};




lgb.integrated.view.MainView.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
    this.mainElement_ = $('<h1>');
    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};



