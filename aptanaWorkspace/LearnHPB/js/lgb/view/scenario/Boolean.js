/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.Boolean');

goog.require('lgb.view.scenario.BaseViewGUI');


lgb.view.scenario.Boolean = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.Boolean, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.Boolean.prototype.appendTo = function(parentElement) {
  
  if (this.debugFlag_) {
    
    this.append('type : Boolean <br />');
    this.appendDebugProperty_('default');
    
  } 
  else {

        this.inputElement_ = $('<input>')
          .attr("type", "checkbox");
          
          if (true == this.dataModel['default']) {
            this.inputElement_.attr("checked", "true");
          }
          

        this.append(this.inputElement_);

    }
  
  this.injectTo(parentElement);  
  
};



