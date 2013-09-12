/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Decimal');

goog.require('lgb.view.scenario.BaseViewGUI');


lgb.view.scenario.Decimal = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.Decimal, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Decimal.prototype.appendTo = function(parentElement) {
  
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
          
        this.append(this.inputElement_);
        
        var html = " ({0}-{1})".format(this.dataModel.min, this.dataModel.max);
        this.append(html);

      
    }
  
  this.injectTo(parentElement);  
  
};



