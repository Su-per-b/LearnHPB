/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.OptionList');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Option');


lgb.view.scenario.OptionList = function(dataModel, debugFlag) {
  lgb.view.scenario.BaseViewGUI.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.view.scenario.OptionList, lgb.view.scenario.BaseViewGUI);



lgb.view.scenario.OptionList.prototype.appendTo = function(parentElement) {
  

  this.injectTo(parentElement);

  if (this.debugFlag_) {

    this.append('type : OptionList <br />');
    this.makeChildren_(parentElement);

  } else {

    this.makeListBox_();

  }



  
};


lgb.view.scenario.OptionList.prototype.makeListBox_ = function() {

    var div = this.makeDiv();
        
     div
    .addClass('input-ListBox')
    .append('<input>')
    .attr('value', '1');
    
    this.append(div);
    
    this.kendoDropDownList = 
      div.kendoDropDownList({
        dataSource: this.dataModel.getChildren(),
            dataTextField: 'name',
            dataValueField: 'name',
        change: this.d(this.onDropDownChange)
      }).data('kendoDropDownList');
      

};

lgb.view.scenario.OptionList.prototype.onDropDownChange = function(event) {
  
  return;
};




lgb.view.scenario.OptionList.childClassMap = {
    "Option" : lgb.view.scenario.Option
};
