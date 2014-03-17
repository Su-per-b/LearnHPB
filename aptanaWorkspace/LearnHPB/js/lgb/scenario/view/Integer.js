/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Integer');

goog.require('lgb.scenario.view.BaseView');


lgb.scenario.view.Integer = function(dataModel, debugFlag, unit) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
  this.unit_ = unit;
};
goog.inherits(lgb.scenario.view.Integer, lgb.scenario.view.BaseView);



lgb.scenario.view.Integer.prototype.appendTo = function(parentElement) {

  if (this.debugFlag_) {

    this.append('type : Integer <br />');
    this.appendDebugProperty_('min');
    this.appendDebugProperty_('max');
    this.appendDebugProperty_('default');

  } else {


    this.inputElement_ = $('<input>').addClass('input-Integer-textbox').attr("type", "text").attr("value", this.dataModel['default']);
    
     if (!this.isEnabled) {
       // this.inputElement_.attr( "disabled", "disabled" );
     }
     
    this.append(this.inputElement_);
    
    
    if (undefined == this.unit_) {
      var html = "({0}-{1})".format(this.dataModel.min, this.dataModel.max);
    } else {
      var html = "{0} ({1}-{2})".format(this.unit_, this.dataModel.min, this.dataModel.max);
      
    }
        
    this.append(html);
  }

  this.injectTo(parentElement);
};

lgb.scenario.view.Integer.prototype.setEnabled = function(enabledFlag) {
  
  
   this.isEnabled = enabledFlag;
   
   // if (this.isEnabled) {
//      
   // } else {
     // this.inputElement_.attr( "disabled", "disabled" );
   // }

};






