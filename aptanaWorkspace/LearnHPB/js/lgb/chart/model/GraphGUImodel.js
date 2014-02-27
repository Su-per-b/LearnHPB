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
  this.init_();

};
goog.inherits(lgb.chart.model.GraphGUImodel, lgb.world.model.BaseModel);





lgb.chart.model.GraphGUImodel.prototype.init_ = function() {

  this.y = {
    max:30,
    min:15,
    mean:24,
    deviation:2
  };
  
  this.x = {
    max:500,
    min:0
  };
  
  var that = this;
  
  this.generateRandomFunction = function() {
    var randomFunction = d3.random.normal(that.y.mean, that.y.deviation);
    return randomFunction;
  };

};

lgb.chart.model.GraphGUImodel.prototype.getDomainX = function() {
 
    return [this.x.min, this.x.max-1];
};


lgb.chart.model.GraphGUImodel.prototype.getDomainY = function() {
 
    return [this.y.min, this.y.max];
};





