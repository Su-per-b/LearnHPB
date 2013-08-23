/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.SystemList');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.System');


lgb.view.scenario.SystemList = function(dataModel) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel);
};
goog.inherits(lgb.view.scenario.SystemList, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.SystemList.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
    
};


lgb.view.scenario.SystemList.prototype.appendTo = function(el, debugFlag) {
 
  el.append(
    $('<h5>').append(this.dataModel.name)
  );
  
  this.makeChildren_(el, debugFlag);
    
};


lgb.view.scenario.SystemList.childClassMap = {
    "System" : lgb.view.scenario.System
};

