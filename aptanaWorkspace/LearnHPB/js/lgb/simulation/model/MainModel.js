/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.MainModel');

goog.require('lgb.model.ModelBase');
goog.require('lgb.simulation.model.voNative.SimStateNative');



/**
 * @constructor
 * @extends lgb.model.ModelBase
 */
lgb.simulation.model.MainModel = function() {


  /**@const */
  this._NAME = 'lgb.simulation.model.MainModel';
  
  /**@const */
  this._TITLE = 'MainModel';
  lgb.model.ModelBase.call(this);

  this.state  = null;
  this.socketServerURL = null;
  
  this.init_();

};
goog.inherits(lgb.simulation.model.MainModel, lgb.model.ModelBase);


/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.model.MainModel.prototype.init_ = function(event) {
  
  this.isPlaying = false;
  this.state = lgb.simulation.model.voNative.SimStateNative.simStateNative_0_uninitialized;
  
  url = String (window.location);
  console.log('window.location: '+ url);
  
  hostname = url.split('/')[2];
  console.log('hostname: '+ hostname);
  
  var hostname2 = hostname.split(':')[0];
  console.log('hostname2: '+ hostname2);
  this.socketServerURL = "ws://" + hostname2 + ":8081/";
  
};


lgb.simulation.model.MainModel.prototype.setState_ = function(state) {

    if (this.state_ != state) {
        this.state_ = state;
     
        this.dispatchChange({state:true});
    }
 
};

lgb.simulation.model.MainModel.prototype.getState = function() {

    return this.state_; 
};




/**
 * @param {String} text
 */
lgb.simulation.model.MainModel.prototype.addResult = function(text) {
  var whatIsDirty = {};
  
  //this.results.push(text);
  this.lastResult = text;
  
  whatIsDirty.lastResult = true;
  this.dispatchChange(whatIsDirty);
  
  
};




/**
 * @param {Object} stateObject Contains information about what to change.
 */
lgb.simulation.model.MainModel.prototype.change = function(stateObject) {

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

