/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.GraphGUImodel_05');
goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.chart.model.GraphGUImodel_05 = function() {

  /**@const */
  this._TITLE = 'GraphGUImodel';

  lgb.core.BaseModel.call(this);
  this.data = [];


  
};
goog.inherits(lgb.chart.model.GraphGUImodel_05, lgb.core.BaseModel);




lgb.chart.model.GraphGUImodel_05.prototype.updateValues = function(integratedMainModel) {
  

  var newDataValue = this.randomFunction_();
  
  // push a new data point onto the back
  this.data.push(newDataValue);
    
  if (this.data.length > this.x.range) {
    this.data.shift();
  }
  
  return;
  
};




lgb.chart.model.GraphGUImodel_05.prototype.setDomainY = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;
  var meanValue = minValue + (rangeValue / 2);
  
  this.y = {
    max:maxValue,
    min:minValue,
    mean:meanValue,
    range:rangeValue
  };
  
  return;
};


lgb.chart.model.GraphGUImodel_05.prototype.setDomainX = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;
  var meanValue = minValue + (rangeValue / 2);
  
  this.x = {
    max:maxValue,
    min:minValue,
    mean:meanValue,
    range:rangeValue,
  };
  
  return;
};



lgb.chart.model.GraphGUImodel_05.prototype.init = function() {
    
  this.setDomainY(35, 70);
  this.setDomainX(0, 20);

  this.randomFunction_ = this.generateRandomFunction();
  
  // this.data = d3.range(this.x.max)
       // .map(this.randomFunction_);

    this.data = [];
    
    var dateObj = new Date(2000,5,24,9,00,00,0);
    var ms = dateObj.getTime();
    
    
        
    var len = 20; //this.data.length;
    for (i = 0; i < len; i++) {

        var item = {
            date:new Date(ms + (60000 * i)),
            value: this.randomFunction_()
        };
        
        this.data.push(item);
        
    }
    
    


    return;

  
};


lgb.chart.model.GraphGUImodel_05.prototype.d3RandomNormal = function(µ, σ, min, max) {
  

	var theFunction =  function() {
		var x, y, r;
		do {
			x = Math.random() * 2 - 1;
			y = Math.random() * 2 - 1;
			r = x * x + y * y;
		} while (!r || r > 1);

		rndValue = µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);

		if (rndValue > max) {
			rndValue = max;
		} else if (rndValue < min) {
			rndValue = min;
		}

		return rndValue;
	};
	
	
    return theFunction;
};


lgb.chart.model.GraphGUImodel_05.prototype.generateRandomFunction = function() {
  
    var standardDeviationValue = this.y.range * 0.3;
    var randomFunction = this.d3RandomNormal(this.y.mean, standardDeviationValue, this.y.min, this.y.max);
    
    return randomFunction;
   
};




lgb.chart.model.GraphGUImodel_05.prototype.getDomainX = function() {
 
    var date1 = this.data[0].date;
    var date2 = this.data[this.data.length - 1].date;
    
    return [date1, date2];
};


lgb.chart.model.GraphGUImodel_05.prototype.getDomainY = function() {
 
    return [this.y.min, this.y.max];
    
};





