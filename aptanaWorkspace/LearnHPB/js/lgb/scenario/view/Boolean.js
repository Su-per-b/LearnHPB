/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.Boolean');

goog.require('lgb.scenario.view.BaseView');

/**
 * @constructor
 * @extends {lgb.scenario.view.BaseView}
 */
lgb.scenario.view.Boolean = function(dataModel, debugFlag) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.scenario.view.Boolean, lgb.scenario.view.BaseView);




lgb.scenario.view.Boolean.prototype.appendTo = function(parentElement) {
  
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
  
  this.injectInto(parentElement);  
  
};



