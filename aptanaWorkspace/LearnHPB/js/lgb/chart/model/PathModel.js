/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.PathModel');
goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.chart.model.PathModel = function(integratedVariable, idx) {


  lgb.core.BaseModel.call(this);
  
  this.idx_ = idx;
  this.setIntegratedVariable(integratedVariable);
  this.setDomainY(5, 30);
  
  this.init_();
  
};
goog.inherits(lgb.chart.model.PathModel, lgb.core.BaseModel);




lgb.chart.model.PathModel.prototype.init_= function() {
  
  this.values_ = [];
    
};


lgb.chart.model.PathModel.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    
    return;   
};




lgb.chart.model.PathModel.prototype.makeRandomData = function(count) {
  
    this.randomFunction_ = this.generateRandomFunction();
    
	for ( i = 0; i < count; i++) {
		var newValue = this.randomFunction_();
		
		newValue = parseFloat((newValue).toFixed(2));
		
		this.values_.push(newValue);
	}
	
};
    


lgb.chart.model.PathModel.prototype.getColumn = function() {
  
    var oneColumn = this.values_.slice(0);
    oneColumn.unshift(this.integratedVariable_.name_scenario);
    
    return oneColumn;
    
};




lgb.chart.model.PathModel.prototype.setIntegratedVariable = function(integratedVariable) {
    
  this.integratedVariable_ = integratedVariable;
};


// lgb.chart.model.PathModel.prototype.setVarName = function(varName) {
  // this.varName_ = varName;
// };


lgb.chart.model.PathModel.prototype.getVarName = function() {
  return this.integratedVariable_.name_scenario;
};



lgb.chart.model.PathModel.prototype.addIntegratedVariable = function(integratedVariable) {
    
  var displayValue = integratedVariable.value.getDisplayValue();
  
  if (displayValue > this.y.max) {
    this.setDomainY(this.y.min, Math.ceil(displayValue));
  }
  
  if (displayValue < this.y.min ) {
    this.setDomainY(Math.floor(displayValue), this.y.max);
  }
  
    this.values_.push(displayValue);
  
    if (this.values_.length > lgb.chart.model.PathModel.maxDataPoints) {
        this.values_.shift();
    }
    
};





lgb.chart.model.PathModel.prototype.generateRandomFunction = function() {
  
    var standardDeviationValue = this.y.range * 0.3;
    var randomFunction = this.d3RandomNormal(this.y.mean, standardDeviationValue, this.y.min, this.y.max);
    
    return randomFunction;
   
};


lgb.chart.model.PathModel.prototype.d3RandomNormal = function(µ, σ, min, max) {
  

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




lgb.chart.model.PathModel.prototype.getDomainX = function() {
 
    return [this.x.min, this.x.max];
};


lgb.chart.model.PathModel.prototype.getDomainY = function() {
 
    return [this.y.min, this.y.max];
    
};


lgb.chart.model.PathModel.prototype.setDomainY = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;
  var meanValue = minValue + (rangeValue / 2);
  
  this.y = {
    max:maxValue,
    min:minValue,
    mean:meanValue,
    range:rangeValue
  };
  
  this.dispatchChangedEx('y', this.y);
  
  return;
};


lgb.chart.model.PathModel.prototype.setDomainX = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;
  var meanValue = minValue + (rangeValue / 2);
  
  this.x = {
    max:maxValue,
    min:minValue,
    mean:meanValue,
    range:rangeValue
  };
  
  this.dispatchChangedEx('x', this.y);
  
  return;
};




lgb.chart.model.PathModel.prototype.calcDomainX = function() {
    
	var date1 = this.values_[0].date;
	var date2 = this.values_[this.values_.length - 1].date;

	this.setDomainX(date1, date2);

};



lgb.chart.model.PathModel.prototype.setTransformValue = function(transformValue) {
    
    this.transformValue = transformValue;

};



lgb.chart.model.PathModel.maxDataPoints = 500;



