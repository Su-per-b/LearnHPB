
goog.provide('test.main.Util');






test.main.Util = function() {


};




test.main.Util.deserialize = function(jsonString) { 

  var deserializedObject = lgb.simulation.controller.JsonController().deserialize(jsonString);
    
  return deserializedObject;
  
};




test.main.Util.deserializeOk = function(jsonString, expectedType) { 

  var deserializedObject = lgb.simulation.controller.JsonController().deserialize(jsonString);
  ok(deserializedObject instanceof expectedType);
   
  return deserializedObject;
  
};



test.main.Util.serializeOk = function(serializableObject, expectedString) { 

  var jsonString_0 = lgb.simulation.controller.JsonController.serialize(serializableObject);
      
  assertEquals(
      expectedString, 
      jsonString_0
  );
  
  return jsonString_0;
  
};



