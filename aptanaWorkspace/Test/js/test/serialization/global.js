goog.provide('test.serialization.global');

goog.require('lgb');
goog.require('lgb.simulation.model.voNative.ConfigStruct');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.events.BaseEvent');
goog.require('se.Event');

voNative = lgb.simulation.model.voNative;
voManaged = lgb.simulation.model.voManaged;
simEvents = lgb.simulation.events;

CONST = test.CONSTANTS;


deserialize  = function(jsonString) {

  var deserializedObject = lgb.simulation.controller.JsonController().deserialize(jsonString);
    
  return deserializedObject;
  
};

deserializeOk  = function(jsonString, expectedType) {

  var deserializedObject = lgb.simulation.controller.JsonController().deserialize(jsonString);
  ok(deserializedObject instanceof expectedType);
   
  return deserializedObject;
  
};

serializeOk  = function(serializableObject, expectedString) {

  var jsonString_0 = lgb.simulation.controller.JsonController.serialize(serializableObject);
      
  assertEquals(
      expectedString, 
      jsonString_0
  );
  
  return jsonString_0;
};