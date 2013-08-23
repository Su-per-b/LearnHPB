/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Category');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Variable');
goog.require('lgb.view.scenario.Component');


lgb.view.scenario.Category = function(dataModel) {

  lgb.view.scenario.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.scenario.Category, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Category.prototype.appendTo = function(el, debugFlag) {
  
  var div = this.makeDiv();
  div.addClass('input-Category');
  
  el.append(
    $('<br />')
  );
  
  el.append(
    $(div).append (this.dataModel.name)
  );
  
  el.append(
    $('<br />')
  );
  
  this.makeChildren_(el, debugFlag);
    
};


lgb.view.scenario.Category.childClassMap = {
  "Variable" : lgb.view.scenario.Variable,
  "Component" : lgb.view.scenario.Component
};

