/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.scenario.OptionList');

goog.require('lgb.view.scenario.BaseViewGUI');
goog.require('lgb.view.scenario.Option');


lgb.view.scenario.OptionList = function(dataModel) {

  lgb.view.scenario.BaseViewGUI.call(this, dataModel);

};
goog.inherits(lgb.view.scenario.OptionList, lgb.view.scenario.BaseViewGUI);




lgb.view.scenario.OptionList.prototype.appendTo = function(el, debugFlag) {
  
  var div = this.makeDiv();
  div.addClass('input-OptionListDebug');


  if (debugFlag) {
    this.debugAppendTo(el);
  } else {
    
    var div = this.makeDiv();
    div.addClass('input-OptionList');
    
    div.append(
      this.dataModel.name
    );
    
    this.makeListBox_(div);
    
    el.append(
      div
    );
    
    // this.makeChildren_(div, debugFlag);
  }
  
  
};


lgb.view.scenario.OptionList.prototype.makeListBox_ = function(el) {

    var div = this.makeDiv();
        
     div
    .addClass('input-ListBox')
    .append('<input>')
    .attr('value', '1')
    .appendTo(el);

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

lgb.view.scenario.OptionList.prototype.debugAppendTo = function(el) {
  
  var div = this.makeDiv();
    
  div.append(
    'type : OptionList <br />'
  );
  
  el.append(
    div
  );

  this.makeChildren_(div, true);
  
};




lgb.view.scenario.OptionList.childClassMap = {
    "Option" : lgb.view.scenario.Option
};
