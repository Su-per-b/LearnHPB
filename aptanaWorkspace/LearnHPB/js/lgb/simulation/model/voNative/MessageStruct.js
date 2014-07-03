goog.provide('lgb.simulation.model.voNative.MessageStruct');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voNative.MessageType');


 /**
 * @constructor
 */
lgb.simulation.model.voNative.MessageStruct = function(msgText, messageType) {

  this.msgText = msgText || "{not set}";
  this.messageType = messageType;
  
  lgb.simulation.model.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.MessageStruct, lgb.simulation.model.BaseModel);




lgb.simulation.model.voNative.MessageStruct.fieldPrimativesEx_ = {
   msgText: "msgText",
   messageType : "messageType"
};





