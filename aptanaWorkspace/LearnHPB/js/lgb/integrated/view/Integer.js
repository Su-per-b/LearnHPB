/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.Integer');

goog.require('lgb.integrated.view.VariableBase');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.Integer = function(dataModel, debugFlag, unit) {
  lgb.integrated.view.VariableBase.call(this, dataModel, debugFlag);
  this.unit_ = unit;
};
goog.inherits(lgb.integrated.view.Integer, lgb.integrated.view.VariableBase);



lgb.integrated.view.Integer.prototype.appendTo = function(parentElement) {

  if (this.debugFlag_) {

    this.append('type : Integer <br />');
    this.appendDebugProperty_('min');
    this.appendDebugProperty_('max');
    this.appendDebugProperty_(start);

  } else {


    this.inputElement_ = $('<input>')
    .addClass('input-Integer-textbox')
    .attr("type", "text")
    .attr("value", this.dataModel.start);
    
     // if (!this.isEnabled) {
       // // this.inputElement_.attr( "disabled", "disabled" );
     // }
     
    this.append(this.inputElement_);
    
    
    if (undefined == this.unit_) {
      var html = "({0}-{1})".format(this.dataModel.min, this.dataModel.max);
    } else {
      var html = "{0} ({1}-{2})".format(this.unit_, this.dataModel.min, this.dataModel.max);
      
    }
        
    this.append(html);
  }

  this.injectInto(parentElement);
};

lgb.integrated.view.Integer.prototype.setEnabled = function(enabledFlag) {
  
  
   this.isEnabled = enabledFlag;
   
   // if (this.isEnabled) {
//      
   // } else {
     // this.inputElement_.attr( "disabled", "disabled" );
   // }

};






