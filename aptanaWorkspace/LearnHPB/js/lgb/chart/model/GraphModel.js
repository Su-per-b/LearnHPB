/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.GraphModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.chart.model.PathModel');

/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.chart.model.GraphModel = function() {

  lgb.core.BaseModel.call(this);
  this.title_ = "{title not set}";
  this.init_();
  
};
goog.inherits(lgb.chart.model.GraphModel, lgb.core.BaseModel);




lgb.chart.model.GraphModel.prototype.init_ = function() {
  
  this.pathModelList_ = [];

};



lgb.chart.model.GraphModel.prototype.setTitle = function(title) {
  
  this.title_ = title;
  
};


lgb.chart.model.GraphModel.prototype.getTitle = function() {
  
  return this.title_;
  
};



lgb.chart.model.GraphModel.prototype.makePathModel = function(varName) {
  
  var pathModel = new lgb.chart.model.PathModel(varName, this.pathModelList_.length);
  pathModel.setDomainY(this.y.min, this.y.max);
  
  this.pathModelList_.push(pathModel);
  
};



lgb.chart.model.GraphModel.prototype.getLatestValue = function() {
  
  return this.latestValue_;
  
};


lgb.chart.model.GraphModel.prototype.makeRandomData = function(count) {
    
    var dateObj = new Date(2000,5,30,9,40,00,0);
    var ms = dateObj.getTime();
    
    this.each(this.pathModelList_, this.makeOneRandomData_, count, ms);
  
    return;
};


lgb.chart.model.GraphModel.prototype.makeOneRandomData_ = function(pathModel, count, ms) {
  
    pathModel.makeRandomData(count, ms);

};



lgb.chart.model.GraphModel.prototype.getDomainX = function() {
 
    return [this.x.min, this.x.max];

};


lgb.chart.model.GraphModel.prototype.getDomainY = function() {
 
    return [this.y.min, this.y.max];
    
};



lgb.chart.model.GraphModel.prototype.setDomainY = function(minValue, maxValue) {
    
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


lgb.chart.model.GraphModel.prototype.calcDomainX = function() {
    
    
    var pathModel = this.pathModelList_[0];
    
    var date1 = pathModel.values_[0].date;
    var date2 = pathModel.values_[pathModel.values_.length - 1].date;
    
    this.setDomainX(date1, date2);
    
  
};



lgb.chart.model.GraphModel.prototype.calcDomainY = function() {
    
  this.each (this.pathModelList_, this.calcOnePathDomainY_);
  
};



lgb.chart.model.GraphModel.prototype.calcOnePathDomainY_ = function(pathModel) {
    
   var domainY = pathModel.getDomainY();
   
   if (domainY[0] < this.y.min) {
       this.setDomainY(domainY[0], domainY[1]);
   } else if (domainY[1] > this.y.max) {
       this.setDomainY(domainY[0], domainY[1]);
   }
   
};



lgb.chart.model.GraphModel.prototype.setDomainX2 = function(dateStart, count) {
    
  var ms = dateStart.getTime();
  var dateEnd = new Date(ms + (120000 * count));

  this.setDomainX(dateStart, dateEnd);  
};


lgb.chart.model.GraphModel.prototype.setDomainX = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;

  this.x = {
    max:maxValue,
    min:minValue,
    range:rangeValue,
  };
  
  this.dispatchChangedEx('x', this.x);
  
  return;
};



lgb.chart.model.GraphModel.prototype.generateRandomFunction = function() {
  
    var standardDeviationValue = this.y.range * 0.3;
    var randomFunction = this.d3RandomNormal(this.y.mean, standardDeviationValue, this.y.min, this.y.max);
    
    return randomFunction;
   
};


lgb.chart.model.GraphModel.prototype.d3RandomNormal = function(µ, σ, min, max) {
  

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


lgb.chart.model.GraphModel.prototype.getPathModelList = function() {
  
    return this.pathModelList_;
    

};




