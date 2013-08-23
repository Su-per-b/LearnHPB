/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.SubSystem');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Category');


lgb.view.scenario.SubSystem = function(dataModel) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel);
};
goog.inherits(lgb.view.scenario.SubSystem, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.SubSystem.prototype.appendTo = function(el, debugFlag) {
  
  
  var div = this.makeDiv();
  div.addClass('input-SubSystem');
  
  el.append(
    div.append( this.dataModel.name)
  );
  
  this.makeChildren_(el, debugFlag);
    
};


lgb.view.scenario.SubSystem.childClassMap = {
    "Category" : lgb.view.scenario.Category
};

