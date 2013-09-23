/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.MainModel');

goog.require('lgb.world.model.BaseModel');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.model.WebSocketConnectionState');


/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.simulation.model.MainModel = function() {


  
  /**@const */
  this._TITLE = 'MainModel';
  lgb.world.model.BaseModel.call(this);

  this.simStateNative = lgb.simulation.model.voNative.SimStateNative.simStateNative_unknown;
  this.webSocketConnectionState = lgb.simulation.model.WebSocketConnectionState.uninitialized;
  
  this.socketServerURL = null;
  this.messageStruct = null;
  this.xmlParsedInfo = null;
  this.scalarValueResults = null;
  
  this.modNameToVarMap_ = {};
  
  this.init_();

};
goog.inherits(lgb.simulation.model.MainModel, lgb.world.model.BaseModel);


/**
 * Handler used for websocket init
 * @private
 */
lgb.simulation.model.MainModel.prototype.init_ = function(event) {
  
  var hostname;
  var hostname2;
  
  
  
  
  switch(lgb.core.Config.SOCKET_SERVER_HOST) {
    
    
    case lgb.core.Config.SOCKET_SERVER.AutoConfig :
    
      url = String (window.location);
      console.log('window.location: '+ url);
      
      hostname = url.split('/')[2];
      console.log('hostname: '+ hostname);
      
      var hostname2 = hostname.split(':')[0];
      console.log('hostname2: '+ hostname2);
      break;
      
    case lgb.core.Config.SOCKET_SERVER.Pfalco :
      hostname2 = 'learnhpb.straylightsim.com';
      break;
      
    case lgb.core.Config.SOCKET_SERVER.PfalcoLocal :
      hostname2 = '192.168.0.15';
      break;
      
  }
  

  this.socketServerURL = "ws://" + hostname2 + ":8081/";
  
};



lgb.simulation.model.MainModel.prototype.setWebSocketConnectionState = function(webSocketConnectionState) {

    this.changePropertyEx('webSocketConnectionState', webSocketConnectionState);

};



lgb.simulation.model.MainModel.prototype.getWebSocketConnectionState = function() {
    return this.webSocketConnectionState;
};





lgb.simulation.model.MainModel.prototype.getSimStateNative = function() {

    return this.simStateNative; 
};



lgb.simulation.model.MainModel.prototype.getIdxFromModelicaName = function(modelicaName) {

    
    return this.modNameToVarMap_[modelicaName]; 
};





lgb.simulation.model.MainModel.prototype.setXmlParseInfo = function(xmlParseInfo) {

  this.xmlParsedInfo = xmlParseInfo;
  
  var varList = xmlParseInfo.scalarVariablesAll_.input_.realVarList_;
  this.each(varList, this.idxOne_);
  
  
  
  this.dispatchChangedEx('xmlParsedInfo', xmlParseInfo);
  
};


lgb.simulation.model.MainModel.prototype.idxOne_ = function(theVar) {

  this.modNameToVarMap_[theVar.name_] = theVar;
};








 
