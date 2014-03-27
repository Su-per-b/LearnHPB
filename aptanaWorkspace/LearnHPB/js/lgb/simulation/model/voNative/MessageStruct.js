goog.provide('lgb.simulation.model.voNative.MessageStruct');

goog.require('lgb.simulation.model.voNative.BaseModel');
goog.require('lgb.simulation.model.voNative.MessageType');


lgb.simulation.model.voNative.MessageStruct = function(msgText, messageType) {

  this.msgText = msgText || "{not set}";
  this.messageType = messageType || lgb.simulation.model.voNative.MessageType.messageType_info;
  
};
goog.inherits(lgb.simulation.model.voNative.MessageStruct, lgb.simulation.model.voNative.BaseModel);



lgb.simulation.model.voNative.MessageStruct.prototype.toJson = function() {
    
    var jsonObj = {
      type:this.getRemoteTypeString(),
      msgText:this.msgText,
      messageType:this.messageType,
    };
    
    var jsonString = lgb.simulation.controller.JsonController.stringify.stringify(jsonObj);
    return jsonString;
};


