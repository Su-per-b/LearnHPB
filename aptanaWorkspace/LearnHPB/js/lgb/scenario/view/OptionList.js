/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.view.OptionList');

goog.require('lgb.scenario.view.BaseView');
goog.require('lgb.scenario.view.Option');


lgb.scenario.view.OptionList = function(dataModel, debugFlag, unit) {
  lgb.scenario.view.BaseView.call(this, dataModel, debugFlag);
  this.unit_ = unit;
};
goog.inherits(lgb.scenario.view.OptionList, lgb.scenario.view.BaseView);



lgb.scenario.view.OptionList.prototype.appendTo = function(parentElement) {
  

  this.injectTo(parentElement);

  if (this.debugFlag_) {

    this.append('type : OptionList <br />');
    this.makeChildren_(parentElement);

  } else {

    this.makeListBox_();

  }



  
};


lgb.scenario.view.OptionList.prototype.makeListBox_ = function() {

    var div = this.makeDiv();
        
     div
    .addClass('input-ListBox')
    .addClass('select')
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
      
      
      if (undefined != this.unit_) {

        var html = " {0}".format(this.unit_);
        this.append(html);
      }
        
        


      

};

lgb.scenario.view.OptionList.prototype.onDropDownChange = function(event) {
  
  return;
};




lgb.scenario.view.OptionList.childClassMap = {
    "Option" : lgb.scenario.view.Option
};
