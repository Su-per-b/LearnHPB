/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Decimal');

goog.require('lgb.scenario.view.BaseView');


lgb.scenario.view.Decimal = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
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
          
        this.append(this.inputElement_);
        
        var html = " ({0}-{1})".format(this.dataModel.min, this.dataModel.max);
        this.append(html);

      
    }
  
  this.injectTo(parentElement);  
  
};



