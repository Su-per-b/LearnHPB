goog.provide('lgb.simulation.model.voNative.ConfigStruct');

goog.require('lgb.simulation.model.voNative.BaseModel');
goog.require('lgb.simulation.model.voNative.DefaultExperimentStruct');


lgb.simulation.model.voNative.ConfigStruct  = function(defaultExperimentStruct, stepDelta) {
  
  this.stepDelta = stepDelta;
  
  goog.asserts.assertInstanceof(defaultExperimentStruct, lgb.simulation.model.voNative.DefaultExperimentStruct);
  this.defaultExperimentStruct = defaultExperimentStruct;
  
  lgb.simulation.model.voNative.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.ConfigStruct, lgb.simulation.model.voNative.BaseModel);



lgb.simulation.model.voNative.ConfigStruct.prototype.toJson = function() {
    
    var jsonObj = this.getJsonObj();
        
    var jsonString = lgb.simulation.controller.JsonController.stringify(jsonObj);
    return jsonString;
};


lgb.simulation.model.voNative.ConfigStruct.fromJson = function(deserializedObj) {

    var defaultExperimentStruct = lgb.simulation.model.voNative.DefaultExperimentStruct.fromJson(deserializedObj.defaultExperimentStruct);
    var configStruct = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct, deserializedObj.stepDelta);

    return configStruct;
};



lgb.simulation.model.voNative.ConfigStruct.prototype.getJsonObj = function() {
    
    var jsonObj = {
      type:this.getRemoteTypeString(),
      stepDelta:this.stepDelta,
      defaultExperimentStruct:this.defaultExperimentStruct.getJsonObj(),
    };
    
    
    return jsonObj;
   
};



