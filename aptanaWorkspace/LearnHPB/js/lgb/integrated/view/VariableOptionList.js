/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.VariableOptionList');

goog.require('lgb.integrated.view.NodeBaseContainer');
goog.require('lgb.integrated.view.VariableOption');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.VariableOptionList = function(dataModel, debugFlag, unit) {
  lgb.integrated.view.NodeBaseContainer.call(this, dataModel, debugFlag);
  this.unit_ = unit;
};
goog.inherits(lgb.integrated.view.VariableOptionList, lgb.integrated.view.NodeBaseContainer);



lgb.integrated.view.VariableOptionList.prototype.appendTo = function(parentElement) {
  

  this.injectInto(parentElement);

  if (this.debugFlag_) {

    this.append('type : VariableOptionList <br />');
    this.makeChildren_(parentElement);

  } else {

    this.makeListBox_();

  }



  
};


lgb.integrated.view.VariableOptionList.prototype.makeListBox_ = function() {

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

lgb.integrated.view.VariableOptionList.prototype.onDropDownChange = function(event) {
  
  return;
};


