/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.Category');

goog.require('lgb.integrated.view.NodeBaseContainer');
goog.require('lgb.integrated.view.Component');
goog.require('goog.asserts');
goog.require('lgb.integrated.view.VariableReal');
goog.require('lgb.integrated.view.VariableOptionList');
goog.require('lgb.integrated.view.VariableInteger');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.Category = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseContainer.call(this, dataModel, debugFlag);
};

goog.inherits(lgb.integrated.view.Category, lgb.integrated.view.NodeBaseContainer);




lgb.integrated.view.Category.prototype.appendTo = function(parentElement) {
  
  this.injectInto(parentElement);  
  this.appendTitle_();
  //this.append('<br />');
  
  this.makeChildren_(parentElement);
  
};




lgb.integrated.view.Category.prototype.appendChildToAndListen_ = function(childModel, parentElement) {
  
  var childView = this.instantiateViewForModel_(childModel);
     
   
    if (undefined == childView) {
        debugger;
    }

  this.relayLocal(
    childView, 
    se.RequestModelicaVariableChange
    );
    
  
  childView.appendTo(parentElement);
  this.children_.push(childView);
  
};


lgb.integrated.view.Category.prototype.getMainElement = function() {

  if (undefined == this.mainElement_) {
      
    if ("NONE" == this.dataModel.name) {
      this.mainElement_ = $('<div>');
    } else {
      this.mainElement_ = $('<h3>');
    }
  

    
    if (undefined != this.htmlID) {
      this.mainElement_.attr('id', this.htmlID);
    }

  }

  return this.mainElement_;
};

lgb.integrated.view.Category.prototype.appendTitle_ = function() {
  
  var html = this.dataModel.name;
  
  if (this.debugFlag_) {
    html += " ({0})".format(this.dataModel.name_scenario);
  }
    
    if ("NONE" == this.dataModel.name) {
      //this.append(html);
    } else {
      this.append(html);
    }

};


  
lgb.integrated.view.Category.prototype.makeChildren_ = function(parentElement) {
  
  this.ul_ = $('<ul>');
  this.ul_.appendTo(parentElement);
  this.each(this.dataModel.children_, this.appendChildToAndListen_, this.ul_);
  
};



lgb.integrated.view.Category.classModelViewMap = {
    "lgb.integrated.model.VariableReal" : lgb.integrated.view.VariableReal,
    "lgb.integrated.model.VariableInteger" : lgb.integrated.view.VariableInteger,
    "lgb.integrated.model.VariableOptionList" : lgb.integrated.view.VariableOptionList,
    "lgb.integrated.model.Component" : lgb.integrated.view.Component
};

    



