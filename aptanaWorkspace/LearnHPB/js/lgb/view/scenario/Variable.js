/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Variable');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Integer');
goog.require('lgb.view.scenario.OptionList');
goog.require('lgb.view.scenario.Decimal');



lgb.view.scenario.Variable = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.Variable, lgb.view.scenario.BaseViewGUI);



lgb.view.scenario.Variable.prototype.appendTo = function(parentElement) {
    
  
  this.injectTo(parentElement);
  
  if (this.debugFlag_) {
    
    this.debugProperties_();
    this.makeChildren_(this.getMainElement());
    
  } 
  else {
  
    var html = "{0} ({1})".format(this.dataModel.name, this.dataModel.abbr);
    this.append(html);
    

      
      var el = this.getMainElement();
      this.makeChildren_(el);
      
      var c = el.children();
  
      c.append(' ' + this.dataModel.unit);

  
    }
  

  
};





lgb.view.scenario.Variable.prototype.injectDebugContent = function() {

  this.makeChildren_(div);
};



lgb.view.scenario.Variable.prototype.debugProperties_ = function() {
  
  this.appendDebugProperty_('name');
  this.appendDebugProperty_('abbr');
  this.appendDebugProperty_('scope');
  this.appendDebugProperty_('phase');
  this.appendDebugProperty_('variability');
  this.appendDebugProperty_('unit');
  
};



lgb.view.scenario.Variable.childClassMap = {
    "Integer" : lgb.view.scenario.Integer,
    "OptionList" : lgb.view.scenario.OptionList,
    "Decimal" : lgb.view.scenario.Decimal
};



