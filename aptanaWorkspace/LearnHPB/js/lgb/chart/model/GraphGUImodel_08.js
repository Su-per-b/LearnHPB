/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.model.GraphGUImodel_08');
goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.chart.model.GraphGUImodel_08 = function() {

  lgb.core.BaseModel.call(this);
  this.data = [];
  this.title_ = "{title not set}";
  
  this.varList_ = [];
  this.varMap_ = {};
  
  this.cities_ = [];
  
};
goog.inherits(lgb.chart.model.GraphGUImodel_08, lgb.core.BaseModel);




lgb.chart.model.GraphGUImodel_08.prototype.init = function(title) {
  
  this.setTitle(title);

    

  return;
};



lgb.chart.model.GraphGUImodel_08.prototype.updateValues = function(integratedMainModel) {
  
  var varName0 = this.varList_[0];
  var varName1 = this.varList_[1];
  
  
  var integratedVariable0 = integratedMainModel.integratedVariableNameMap_[varName0];
  var value0 = integratedVariable0.value.getDisplayValue();
  
  //var integratedVariable1 = integratedMainModel.integratedVariableNameMap_[varName1];
  //var value1 = integratedVariable1.value.getDisplayValue();
  

  var dateObject = integratedMainModel.getDateObject();
  var timeStr = integratedMainModel.getTimeStr();
  var dateObj = integratedMainModel.getDateObject();
    
  if (value0 > this.y.max) {
    this.setDomainY(this.y.min, Math.ceil(value0));
  }
  
  if (value0 < this.y.min ) {
    this.setDomainY(Math.floor(value0), this.y.max);
  }


  var value1 = value0 + 1.0;
  var valueList = [value0, value1];
        
        
  var newItem = {
      date: dateObj,
      valueList: valueList
  };


  this.data.push(newItem);
  this.latestValue_ = newItem;
  
  this.calcDomainX();
  
  this.dispatchChangedEx('data', this.data);
  
  if (this.data.length > 20) {
    this.data.shift();
  }
  
  


  return;
  
};




lgb.chart.model.GraphGUImodel_08.prototype.setTitle = function(title) {
  
  this.title_ = title;
  
};



lgb.chart.model.GraphGUImodel_08.prototype.getTitle = function() {
  
  return this.title_;
  
};




lgb.chart.model.GraphGUImodel_08.prototype.addVariable = function(varName, min, max) {
  
  this.varList_.push(varName);
  
  this.setDomainY(min, max);
  
  this.varMap_[varName] = [];
  
  var city = {
      name: varName,
      values:[]
  };
  
  this.cities_.push(city);

  
};




lgb.chart.model.GraphGUImodel_08.prototype.getLatestValue = function() {
  
  return this.latestValue_;
  
};






lgb.chart.model.GraphGUImodel_08.prototype.makeRandomData = function(count) {
    
    
	this.setDomainX(0, count);

	this.randomFunction_ = this.generateRandomFunction(); 
	
	
    this.data = [];

    
    var dateObj = new Date(2000,5,30,9,40,00,0);
    var ms = dateObj.getTime();
       
    var len = count; //this.data.length;
    for (i = 0; i < len; i++) {

        var v0 = this.randomFunction_();
        var v1 = v0 + 1.0;
        var latestDateObj = new Date(ms + (120000 * i));
        var valueList = [v0, v1];
        
        var item = {
            date:latestDateObj,
            valueList:valueList
        };
        
        this.data.push(item);
        
        
        var varCount = this.cities_.length;
        for (j = 0; j < varCount; j++) {
            var city = this.cities_[j];
            
            city.values.push(
                {
                    date:latestDateObj,
                    temperature:this.randomFunction_()
                }
                
                );
        }
        
        
    }

    
        
	this.calcDomainX();
	
    

    

};



// lgb.chart.model.GraphGUImodel_08.prototype.getDomainX = function() {
//  
    // var date1 = this.data[0].date;
    // var date2 = this.data[this.data.length - 1].date;
//     
    // return [date1, date2];
// };


lgb.chart.model.GraphGUImodel_08.prototype.getDomainX = function() {
 
    return [this.x.min, this.x.max];
};


lgb.chart.model.GraphGUImodel_08.prototype.getDomainY = function() {
 
    return [this.y.min, this.y.max];
    
};



lgb.chart.model.GraphGUImodel_08.prototype.setDomainY = function(minValue, maxValue) {
    
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


lgb.chart.model.GraphGUImodel_08.prototype.calcDomainX = function() {
    
    var date1 = this.data[0].date;
    var date2 = this.data[this.data.length - 1].date;
    
    this.setDomainX(date1, date2);
  
};


lgb.chart.model.GraphGUImodel_08.prototype.setDomainX = function(minValue, maxValue) {
    
  var rangeValue = maxValue - minValue;
  //var meanValue = minValue + (rangeValue / 2);
  
  this.x = {
    max:maxValue,
    min:minValue,
    range:rangeValue,
  };
  
 // this.dispatchChangedEx('x', this.x);
  
  return;
};



lgb.chart.model.GraphGUImodel_08.prototype.generateRandomFunction = function() {
  
    var standardDeviationValue = this.y.range * 0.3;
    var randomFunction = this.d3RandomNormal(this.y.mean, standardDeviationValue, this.y.min, this.y.max);
    
    return randomFunction;
   
};


lgb.chart.model.GraphGUImodel_08.prototype.d3RandomNormal = function(µ, σ, min, max) {
  

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

