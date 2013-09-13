/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Integer');

goog.require('lgb.scenario.view.BaseViewGUI');


lgb.scenario.view.Integer = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.Integer, lgb.scenario.view.BaseViewGUI);



lgb.scenario.view.Integer.prototype.appendTo = function(parentElement) {

  if (this.debugFlag_) {

    this.append('type : Integer <br />');
    this.appendDebugProperty_('min');
    this.appendDebugProperty_('max');
    this.appendDebugProperty_('default');

  } else {


    this.inputElement_ = $('<input>').addClass('input-Integer-textbox').attr("type", "text").attr("value", this.dataModel['default']);
    this.append(this.inputElement_);
    
    var html = " ({0}-{1})".format(this.dataModel.min, this.dataModel.max);
    this.append(html);
  }

  this.injectTo(parentElement);
};







