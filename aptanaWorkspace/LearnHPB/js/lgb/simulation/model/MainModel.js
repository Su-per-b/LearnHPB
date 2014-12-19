/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.MainModel');

goog.require('lgb.core.BaseModel');
goog.require('lgb.simulation.model.WebSocketConnectionState');




/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.simulation.model.MainModel = function() {

  lgb.core.BaseModel.call(this);

  this.simStateNative = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized;
  this.webSocketConnectionState = lgb.simulation.model.WebSocketConnectionState.uninitialized;
  this.socketServerURL = null;
  this.messageStruct = null;
  this.xmlParsedInfo = null;
  this.scalarValueResults = null;

};
goog.inherits(lgb.simulation.model.MainModel, lgb.core.BaseModel);



lgb.simulation.model.MainModel.prototype.init = function(hostname) {
  this.socketServerURL = "ws://" + hostname + ":8081/";
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


lgb.simulation.model.MainModel.prototype.setXmlParseInfo = function(xmlParsedInfo) {
  this.xmlParsedInfo = xmlParsedInfo;
  this.dispatchChangedEx('xmlParsedInfo', xmlParsedInfo);
};







 
