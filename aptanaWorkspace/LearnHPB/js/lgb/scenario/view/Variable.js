/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Variable');

goog.require('lgb.scenario.view.BaseViewGUI');
goog.require('lgb.scenario.view.Integer');
goog.require('lgb.scenario.view.OptionList');
goog.require('lgb.scenario.view.Decimal');
goog.require('lgb.scenario.view.Boolean');
goog.require('lgb.scenario.view.Temperature');



lgb.scenario.view.Variable = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.Variable, lgb.scenario.view.BaseViewGUI);



lgb.scenario.view.Variable.prototype.appendTo = function(parentElement) {
    
  
  this.injectTo(parentElement);
  
  if (this.debugFlag_) {
    
    this.debugProperties_();
    this.makeChildren_(this.getMainElement());
    
  } 
  else {
  
    var html = "{0} ({1}) - {2}".format(this.dataModel.name, this.dataModel.abbr, this.dataModel.modName);
    this.append(html);
    
      var el = this.getMainElement();
      this.makeChildren_(el);
      
      
      if (null != this.dataModel.unit) {
        var c = el.children();
        c.append(' ' + this.dataModel.unit);
      }

    }
  
};





lgb.scenario.view.Variable.prototype.injectDebugContent = function() {

  this.makeChildren_(div);
};



lgb.scenario.view.Variable.prototype.debugProperties_ = function() {
  
  this.appendDebugProperty_('name');
  this.appendDebugProperty_('abbr');
  this.appendDebugProperty_('scope');
  this.appendDebugProperty_('phase');
  this.appendDebugProperty_('variability');
  this.appendDebugProperty_('unit');
  this.appendDebugProperty_('modName');
  
};



lgb.scenario.view.Variable.childClassMap = {
    "Integer" : lgb.scenario.view.Integer,
    "OptionList" : lgb.scenario.view.OptionList,
    "Decimal" : lgb.scenario.view.Decimal,
    "Boolean" : lgb.scenario.view.Boolean,
    "Temperature" : lgb.scenario.view.Temperature
};



