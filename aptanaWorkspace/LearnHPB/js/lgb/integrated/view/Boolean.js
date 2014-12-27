/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.Boolean');

goog.require('lgb.integrated.view.VariableBase');
/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.Boolean = function(dataModel, debugFlag) {
  lgb.integrated.view.VariableBase.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.Boolean, lgb.integrated.view.VariableBase);




lgb.integrated.view.Boolean.prototype.appendTo = function(parentElement) {
  
  if (this.debugFlag_) {
    
    this.append('type : Boolean <br />');
    this.appendDebugProperty_('start');
    
  } 
  else {

        this.inputElement_ = $('<input>')
          .attr("type", "checkbox");
          
          if (true == this.dataModel.start) {
            this.inputElement_.attr("checked", "true");
          }
          

        this.append(this.inputElement_);

    }
  
  this.injectInto(parentElement);  
  
};



