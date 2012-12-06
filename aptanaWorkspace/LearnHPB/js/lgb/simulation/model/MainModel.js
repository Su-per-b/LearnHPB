/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.MainModel');

goog.require('lgb.model.ModelBase');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.model.WebSocketConnectionState');


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

  this.simStateNative = lgb.simulation.model.voNative.SimStateNative.simStateNative_unknown;
  this.webSocketConnectionState = lgb.simulation.model.WebSocketConnectionState.uninitialized;
  
  this.socketServerURL = null;
  this.messageStruct = null;
  this.xmlParsedInfo = null;
  this.scalarValueResults = null;
  this.init_();

};
goog.inherits(lgb.simulation.model.MainModel, lgb.model.ModelBase);


/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.model.MainModel.prototype.init_ = function(event) {
  

  url = String (window.location);
  console.log('window.location: '+ url);
  
  hostname = url.split('/')[2];
  console.log('hostname: '+ hostname);
  
  var hostname2 = hostname.split(':')[0];
  console.log('hostname2: '+ hostname2);
  this.socketServerURL = "ws://" + hostname2 + ":8081/";
  
};

lgb.simulation.model.MainModel.prototype.setScalarValueResults = function(scalarValueResults) {
    
    this.scalarValueResults = scalarValueResults;
    this.dispatchChange({scalarValueResults:true});
    
};



lgb.simulation.model.MainModel.prototype.setWebSocketConnectionState = function(webSocketConnectionState) {

    if (this.webSocketConnectionState != webSocketConnectionState) {
        this.webSocketConnectionState = webSocketConnectionState;
     
       // this.dispatchChange({webSocketConnectionState:true});
    }
 
};



lgb.simulation.model.MainModel.prototype.getWebSocketConnectionState = function() {
    return this.webSocketConnectionState;
};




lgb.simulation.model.MainModel.prototype.setSimStateNative = function(simStateNative) {

    if (this.simStateNative != simStateNative) {
        this.simStateNative = simStateNative;
     
        this.dispatchChange({simStateNative:true});
    }
 
};


lgb.simulation.model.MainModel.prototype.setXMLparsedInfo = function(xmlParsedInfo) {

        this.xmlParsedInfo = xmlParsedInfo;
        
        this.dispatchChange({xmlParsedInfo:true});
    
 
};


lgb.simulation.model.MainModel.prototype.getSimStateNative = function() {

    return this.simStateNative; 
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
 * @param {String} text
 */
lgb.simulation.model.MainModel.prototype.setMessage = function(messageStruct) {
  
  this.messageStruct = messageStruct;
  this.dispatchChange({messageStruct:true});
  
};




 
