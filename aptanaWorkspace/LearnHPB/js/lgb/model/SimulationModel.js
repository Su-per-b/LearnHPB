/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.SimulationModel');

goog.require('lgb.model.BaseModel');
goog.require('lgb.model.SimulationModelState');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.SimulationModel = function() {

  
  /**@const */
  this._TITLE = 'Simulation';

  this.isPlaying = false;
  this.state = lgb.model.SimulationModelState.STOPPED;
  
  url = String (window.location);
  console.log('window.location: '+ url);
  
  hostname = url.split('/')[2];
  console.log('hostname: '+ hostname);
  
  var hostname2 = hostname.split(':')[0];
  console.log('hostname2: '+ hostname2);
  this.socketServerURL = "ws://" + hostname2 + ":8081/";
  
  lgb.model.BaseModel.call(this);
  
  
  this.results = [];
  this.lastResult;

};
goog.inherits(lgb.model.SimulationModel, lgb.model.BaseModel);





/**
 * @param {String} text
 */
lgb.model.SimulationModel.prototype.addResult = function(text) {
  var whatIsDirty = {};
  
  //this.results.push(text);
  this.lastResult = text;
  
  whatIsDirty.lastResult = true;
  this.dispatchChange(whatIsDirty);
  
  
};




/**
 * @param {Object} stateObject Contains information about what to change.
 */
lgb.model.SimulationModel.prototype.change = function(stateObject) {

  var isAnythingDirty = false;
  var whatIsDirty = {};

  if (stateObject.state != null &&
    stateObject.state != this.state) {

    this.state = stateObject.state;
    whatIsDirty.state = true;
    isAnythingDirty = true;
  }

  if (isAnythingDirty) {
    this.dispatchChange(whatIsDirty);
  }
  
  
};



