/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.GraphGUImodel');
goog.require('lgb.world.model.BaseModel');



/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.chart.model.GraphGUImodel = function() {

  /**@const */
  this._TITLE = 'GraphGUImodel';


  lgb.world.model.BaseModel.call(this);
  this.data = [];
  
  this.init_();

  
};
goog.inherits(lgb.chart.model.GraphGUImodel, lgb.world.model.BaseModel);



lgb.chart.model.GraphGUImodel.prototype.generateData = function() {
  
  this.data = [
   { timeString: "07:45:00", value: 20.0},
   { timeString: "07:46:00", value: 22.0},
   { timeString: "07:47:00", value: 23.0},
   { timeString: "07:48:00", value: 24.0}
  ];
  
};


lgb.chart.model.GraphGUImodel.prototype.extractFromResults = function(scalarValueResultsConverted) {
  
  var realList = scalarValueResultsConverted.output.realList;
  
  var scalarValue = realList[7];
 // var scalarValue = realList[10];
  
  var value = parseFloat(scalarValue.value_);
  var timeString = scalarValueResultsConverted.time_;
  var dateObj = this.formatDateObj_ .parse(timeString);
    

  var newRecord = { dateObj: dateObj ,  value:  value};
  
  this.data.push(newRecord); 
    
};






lgb.chart.model.GraphGUImodel.prototype.init_ = function() {
  
  this.generateData();
   
  
  var formatDateObj = d3.time.format("%H:%M:%S");
  this.formatDateObj_ = formatDateObj;

  this.data.forEach(function(d,i) {
    d.dateObj = formatDateObj.parse(d.timeString);
  });

  
  this.y = {
    max:26,
    min:15,
    mean:24,
    deviation:2
  };
  
  this.domainY_ = [
    this.y.min,
    this.y.max
  ];
  
  
  var minDate = formatDateObj.parse("7:45:00");
  var maxDate  = formatDateObj.parse("8:00:00");
  

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

lgb.chart.model.GraphGUImodel.prototype.getDomainX = function() {
 
    return this.domainX_;
};


lgb.chart.model.GraphGUImodel.prototype.getDomainY = function() {
 
    return this.domainY_;
};





