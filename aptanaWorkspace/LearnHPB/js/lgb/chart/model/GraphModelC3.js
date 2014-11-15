/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.GraphModelC3');

goog.require('lgb.core.BaseModel');
goog.require('lgb.chart.model.PathModelC3');

/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.chart.model.GraphModelC3 = function() {

  lgb.core.BaseModel.call(this);
  this.title_ = "{title not set}";
  this.displayUnitSystem_ = lgb.simulation.model.DisplayUnitSystem.getInstance();
  this.init_();
  
};
goog.inherits(lgb.chart.model.GraphModelC3, lgb.core.BaseModel);



lgb.chart.model.GraphModelC3.prototype.init_ = function() {
  
  this.pathModelList_ = [];
  this.columns_ = [];
  this.dateList_ = [];
  
  this.c3Data_ = {
      x:[]
  };
  
  this.varNameList_ = [];
  
};


lgb.chart.model.GraphModelC3.prototype.setTitle = function(title) {
  this.title_ = title;
};


lgb.chart.model.GraphModelC3.prototype.getTitle = function() {
  return this.title_;
};


lgb.chart.model.GraphModelC3.prototype.getC3data = function() {
  return this.c3Data_;
};


lgb.chart.model.GraphModelC3.prototype.getColumns = function() {
  
  this.columns_ = [];
  this.each(this.pathModelList_, this.addOneColumn_);

  var x = this.dateList_.slice(0);
  x.unshift('x');
  
  
  this.columns_.push(x);
  
  return this.columns_;
};


lgb.chart.model.GraphModelC3.prototype.addOneColumn_ = function(pathModel) {
    
    var oneColumn = pathModel.getColumn();
    this.columns_.push(oneColumn);
   
};






lgb.chart.model.GraphModelC3.prototype.updateIntegratedMainModel = function(integratedMainModel) {

    this.integratedMainModel_ = integratedMainModel;
    
    var dateObj = integratedMainModel.getDateObject();
    
    this.dateList_.push(dateObj);
    
    if (this.dateList_.length > lgb.chart.model.PathModelC3.maxDataPoints) {
        this.dateList_.shift();
    }
    
    this.each(this.pathModelList_, this.update_);
    
   var columns = this.getColumns();
   this.dispatchChangedEx('columns', columns);

    return;   
};



lgb.chart.model.GraphModelC3.prototype.update_ = function(pathModel) {

    var varName = pathModel.getVarName();
    var integratedVariable = this.integratedMainModel_.integratedVariableNameMap_[varName];
    pathModel.addIntegratedVariable(integratedVariable);
    
    return;   
};


lgb.chart.model.GraphModelC3.prototype.changeDisplayUnitSystem = function(displayUnitSystem) {

    
    return;   
};




lgb.chart.model.GraphModelC3.prototype.makePathModel = function(varName) {
  
  var pathModel = new lgb.chart.model.PathModelC3(varName, this.pathModelList_.length);
  pathModel.setDomainY(this.y.min, this.y.max);
  
  this.pathModelList_.push(pathModel);
  
};



lgb.chart.model.GraphModelC3.prototype.getLatestValue = function() {
  return this.latestValue_;
};


lgb.chart.model.GraphModelC3.prototype.makeRandomData = function(count) {
    
    var dateObj = new Date(2000,5,30,9,40,00,0);
    var ms = dateObj.getTime();
    
    
    for ( i = 0; i < count; i++) {

        var latestDateObj = new Date(ms + (120000 * i));
        this.dateList_.push(latestDateObj);
    }
    
    
    this.each(this.pathModelList_, this.makeOneRandomData_, count, ms);
  
    return;
};


lgb.chart.model.GraphModelC3.prototype.makeOneRandomData_ = function(pathModel, count, ms) {
  
    pathModel.makeRandomData(count, ms);
    
   // var varName = pathModel.getVarName();
    //this.c3Data_[varName] = pathModel.getValuesC3();
    
};



lgb.chart.model.GraphModelC3.prototype.getDomainX = function() {
    return [this.x.min, this.x.max];
};


lgb.chart.model.GraphModelC3.prototype.getDomainY = function() {
    return [this.y.min, this.y.max];
};



lgb.chart.model.GraphModelC3.prototype.setDomainY = function(minValue, maxValue) {
    
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


lgb.chart.model.GraphModelC3.prototype.calcDomainX = function() {
    
    
    var pathModel = this.pathModelList_[0];
    
    var date1 = pathModel.values_[0].date;
    var date2 = pathModel.values_[pathModel.values_.length - 1].date;
    
    this.setDomainX(date1, date2);
    
  
};



lgb.chart.model.GraphModelC3.prototype.calcDomainY = function() {
    
  this.each (this.pathModelList_, this.calcOnePathDomainY_);
  
};



lgb.chart.model.GraphModelC3.prototype.calcOnePathDomainY_ = function(pathModel) {
    
   var domainY = pathModel.getDomainY();
   
   if (domainY[0] < this.y.min) {
       this.setDomainY(domainY[0], domainY[1]);
   } else if (domainY[1] > this.y.max) {
       this.setDomainY(domainY[0], domainY[1]);
   }
   
};



lgb.chart.model.GraphModelC3.prototype.setDomainX2 = function(dateStart, count) {
    
  var ms = dateStart.getTime();
  var dateEnd = new Date(ms + (120000 * count));

  this.setDomainX(dateStart, dateEnd);  
};


lgb.chart.model.GraphModelC3.prototype.setDomainX = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;

  this.x = {
    max:maxValue,
    min:minValue,
    range:rangeValue,
  };
  
  this.dispatchChangedEx('x', this.x);
  
  return;
};



lgb.chart.model.GraphModelC3.prototype.generateRandomFunction = function() {
  
    var standardDeviationValue = this.y.range * 0.3;
    var randomFunction = this.d3RandomNormal(this.y.mean, standardDeviationValue, this.y.min, this.y.max);
    
    return randomFunction;
   
};


lgb.chart.model.GraphModelC3.prototype.d3RandomNormal = function(µ, σ, min, max) {
  

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



lgb.chart.model.GraphModelC3.prototype.getPathModelList = function() {
    return this.pathModelList_;
};




