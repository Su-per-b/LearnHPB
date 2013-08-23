/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Variable');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Integer');
goog.require('lgb.view.scenario.OptionList');
goog.require('lgb.view.scenario.Decimal');



lgb.view.scenario.Variable = function(dataModel) {

  lgb.view.scenario.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.scenario.Variable, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Variable.prototype.appendTo = function(el, debugFlag) {
  
  if (debugFlag) {
    this.debugAppendTo(el);
  } else {
    
    var div = this.makeDiv();
    div.addClass('input-Variable');
    
    div.append(
      this.dataModel.name
    );
    
    el.append(
      div
    );
    
    this.makeChildren_(div, debugFlag);
    
    var c = div.children();
    
    c.append(
      this.dataModel.unit
    );
    
    
  }
  
};




lgb.view.scenario.Variable.prototype.debugAppendTo = function(el) {

  var div = this.makeDiv();
  div.addClass('input-VariableDebug');
  
  
  div.append(
    'name : ' + this.dataModel.name + '<br />'
  );
  
  div.append(
    'scope : ' + this.dataModel.scope + '<br />'
  );
  
  div.append(
    'phase : ' + this.dataModel.phase + '<br />'
  );
  
  div.append(
    'variability : ' + this.dataModel.variability + '<br />'
  );
  
  div.append(
    'unit : ' + this.dataModel.unit + '<br />'
  );
  
  el.append(
    div
  );

  this.makeChildren_(div, true);
};


lgb.view.scenario.Variable.childClassMap = {
    "Integer" : lgb.view.scenario.Integer,
    "OptionList" : lgb.view.scenario.OptionList,
    "Decimal" : lgb.view.scenario.Decimal
};

