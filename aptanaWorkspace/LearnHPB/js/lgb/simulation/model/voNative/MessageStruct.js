goog.provide('lgb.simulation.model.voNative.MessageStruct');

goog.require('lgb.simulation.model.voNative.MessageType');


lgb.simulation.model.voNative.MessageStruct = function(msgText, messageType) {

  /**
   * @const
   * @type {string}
   */
  this._NAME = 'lgb.simulation.model.voNative.MessageStruct';
  
  this.msgText = msgText;
  this.messageType = messageType;
  

};


