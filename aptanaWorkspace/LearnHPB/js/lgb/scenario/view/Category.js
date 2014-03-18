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
  
  this.injectInto(parentElement);  
  this.appendTitle_();
  //this.append('<br />');
  
  this.makeChildren_(parentElement);
  
};


lgb.scenario.view.Category.childClassMap = {
  "Variable" : lgb.scenario.view.Variable,
  "Component" : lgb.scenario.view.Component
};


lgb.scenario.view.Category.prototype.getMainElement = function() {

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

lgb.scenario.view.Category.prototype.appendTitle_ = function() {
  
  var html = this.dataModel.name;
  
  if (this.debugFlag_) {
    html += " ({0})".format(this.dataModel.abbr);
  }
  
  
    if ("NONE" == this.dataModel.name) {
      //this.append(html);
    } else {
      this.append(html);
    }


  
  
};

  
lgb.scenario.view.Category.prototype.makeChildren_ = function(parentElement) {
  
  this.ul_ = $('<ul>');
  this.ul_.appendTo(parentElement);
  this.each(this.dataModel.children_, this.appendChildTo_, this.ul_);
  
};


// lgb.scenario.view.Category.prototype.makeChildren_ = function(parentElement) {
//   
  // this.ul_ = $(<ul>);
  // this.ul_.appendTo(parentElement);
//   
//   
  // this.each(this.dataModel.children_, this.appendChildTo_, this.ul_);
//   
// };



// 
// 
// 

