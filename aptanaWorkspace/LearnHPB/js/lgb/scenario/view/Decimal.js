/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Decimal');

goog.require('lgb.scenario.view.BaseView');


lgb.scenario.view.Decimal = function(dataModel, debugFlag, unit) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
  this.unit_ = unit;
};
goog.inherits(lgb.scenario.view.Decimal, lgb.scenario.view.BaseView);




lgb.scenario.view.Decimal.prototype.appendTo = function(parentElement) {
  
  if (this.debugFlag_) {
    
    this.append('type : Decimal <br />');
    this.appendDebugProperty_('min');
    this.appendDebugProperty_('max');
    this.appendDebugProperty_('default');
    
  } else {

        this.inputElement_ = $('<input>')
          .addClass('input-Integer-textbox')
          .attr("type", "text")
          .attr( "size", "6" )
          .attr( "maxlength", "10" )
          .attr("value", this.dataModel['default']);
          

           
         if (this.isEnabled == false) {
           // this.inputElement_.attr( "disabled", "disabled" );
         } else {
           

         }
     
     
        this.append(this.inputElement_);
        
        
        if (undefined == this.unit_) {
          var html = "({0}-{1})".format( this.dataModel.min, this.dataModel.max);
        } else {
          var html = "{0} ({1}-{2})".format(this.unit_, this.dataModel.min, this.dataModel.max);
          
        }
        
        

        this.append(html);


        this.inputElement_.blur(this.d(this.onblur_));
      
    }
  
  this.injectTo(parentElement);  
  
};




lgb.scenario.view.Decimal.prototype.onblur_ = function(event) {
  
  
  var stringValue = this.inputElement_[0].value;
  var floatValue = parseFloat(stringValue);
  
  this.triggerLocal(e.GuiValueChanged, floatValue);
};

lgb.scenario.view.Decimal.prototype.setEnabled = function(enabledFlag) {

   this.isEnabled = enabledFlag;

};
