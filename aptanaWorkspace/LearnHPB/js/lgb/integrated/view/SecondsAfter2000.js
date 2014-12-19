/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.SecondsAfter2000');

goog.require('lgb.integrated.view.NodeBaseLeaf');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.SecondsAfter2000 = function(dataModel, debugFlag) {
  lgb.integrated.view.NodeBaseLeaf.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.SecondsAfter2000, lgb.integrated.view.NodeBaseLeaf);




lgb.integrated.view.SecondsAfter2000.prototype.appendTo = function(parentElement) {
  


  this.injectInto(parentElement);
    
  this.makeTimePicker_();
  this.makeDatePicker_();
  
  var seconds = this.dataModel.getInternalValue();
    
  return;
  
};



lgb.integrated.view.SecondsAfter2000.prototype.onChangeTimePicker_ = function(event) {


    var dateObject = this.timePicker_.value();
    
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();
    
    this.dataModel.setHoursAndMinutes(hours, minutes);
    

};


lgb.integrated.view.SecondsAfter2000.prototype.onChangeDatePicker_ = function(event) {

    var dateObject = this.datePicker_.value();
    
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth();
    var date = dateObject.getDate();
    
    var newDate = {
        year: year,
        month: month,
        date: date
    };
    
    
    this.dataModel.setYearMonthDate(year, month, date);
    
    var newValueInternal = this.dataModel.getInternalValue();
    
    
     var newPayload = {
       idx : this.dataModel.getIdx(),
       value : newValueInternal
     };
    
    
    this.triggerLocal(se.RequestSimulationVariableChange, newPayload);
        
    
    return;
};



lgb.integrated.view.SecondsAfter2000.prototype.makeDatePicker_ = function() {

    
    var dateStr = this.dataModel.getDateStr();
    
    var divDatePicker = $('<input>')
        .attr("value", dateStr)
        .addClass("datePicker");
    
        
    this.append (divDatePicker);

    divDatePicker.kendoDatePicker(
        {change: this.d(this.onChangeDatePicker_)}  
    );
    
    
    this.datePicker_ = divDatePicker.data('kendoDatePicker');

};


lgb.integrated.view.SecondsAfter2000.prototype.makeTimePicker_ = function() {

    //var unit = this.dataModel.getUnit();
    
    var timeStr = this.dataModel.getTimeStr();
    
    var divTimePicker = $('<input>')
        .attr("value", timeStr)
        .addClass("timePicker");
    
        
    this.append (divTimePicker);

    divTimePicker.kendoTimePicker(
        {change: this.d(this.onChangeTimePicker_)}  
    );
    
    
    this.timePicker_ = divTimePicker.data('kendoTimePicker');

};





