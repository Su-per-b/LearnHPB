/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.GraphGUImodel_06');
goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.chart.model.GraphGUImodel_06 = function() {

  /**@const */
  this._TITLE = 'GraphGUImodel';


  lgb.core.BaseModel.call(this);
  this.data = [];
  
};
goog.inherits(lgb.chart.model.GraphGUImodel_06, lgb.core.BaseModel);




lgb.chart.model.GraphGUImodel_06.prototype.updateValues = function(integratedMainModel) {
  

  var integratedVariable = integratedMainModel.integratedVariableNameMap_['y_ZN_1'];
  
  //var integratedVariable = integratedMainModel.integratedVariableNameMap_['y_SYS_1'];
  
  var value = integratedVariable.value.getDisplayValue();

  
  this.data.push(value); 
  this.latestValue_ = value;
  
  this.dispatchChangedEx('data', this.data);
  
  if (this.data.length > 20) {
    this.data.shift();
  }
  

  
  return;
  
};



lgb.chart.model.GraphGUImodel_06.prototype.getLatestValue = function() {
  

  return this.latestValue_;
  
};







lgb.chart.model.GraphGUImodel_06.prototype.extractFromResults = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  
  var scalarValue = realList[7];
  
  var value = parseFloat(scalarValue.value_);
  var timeString = scalarValueResultsConverted.time_;
  var dateObj = this.formatDateObj_ .parse(timeString);
    

  var newRecord = { dateObj: dateObj ,  value:  value};
  
  this.data.push(newRecord); 
  


};


lgb.chart.model.GraphGUImodel_06.prototype.init_05 = function() {
    
  //var formatDateObj = d3.time.format("%H:%M:%S");
 // this.formatDateObj_ = formatDateObj;

  //this.data.forEach(function(d,i) {
  //  d.dateObj = formatDateObj.parse(d.timeString);
 // });

  
  this.y = {
    max:30,
    min:11,
    mean:20,
    deviation:2
  };
  
  
  
  this.domainY_ = [
    this.y.min,
    this.y.max
  ];
  
  
  //var minDate = this.formatDateObj_.parse("7:45:00");
  //var maxDate  = this.formatDateObj_.parse("8:00:00");
  

  this.domainX_ = [
    0,
    20
  ];
  
  var that = this;
  
  
  this.generateRandomFunction = function() {
    var randomFunction = d3.random.normal(that.y.mean, that.y.deviation);
    return randomFunction;
  };
  
  
  
};



lgb.chart.model.GraphGUImodel_06.prototype.init_04 = function() {
    
  var formatDateObj = d3.time.format("%H:%M:%S");
  this.formatDateObj_ = formatDateObj;

  this.data.forEach(function(d,i) {
    d.dateObj = formatDateObj.parse(d.timeString);
  });

  
  this.y = {
    max:25,
    min:12,
    mean:16,
    deviation:2
  };
  
  
  
  this.domainY_ = [
    this.y.min,
    this.y.max
  ];
  
  
  var minDate = this.formatDateObj_.parse("7:45:00");
  var maxDate  = this.formatDateObj_.parse("8:00:00");
  

  this.domainX_ = [
    minDate,
    maxDate
  ];
  
  var that = this;
  
  
  this.generateRandomFunction = function() {
    var randomFunction = d3.random.normal(that.y.mean, that.y.deviation);
    return randomFunction;
  };
  
  
  
};





lgb.chart.model.GraphGUImodel_06.prototype.getDomainX = function() {
 
    return this.domainX_;
};


lgb.chart.model.GraphGUImodel_06.prototype.getDomainY = function() {
 
    return this.domainY_;
};





