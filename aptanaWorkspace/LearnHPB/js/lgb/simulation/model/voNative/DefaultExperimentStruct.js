goog.provide('lgb.simulation.model.voNative.DefaultExperimentStruct');

goog.require('lgb.simulation.model.voNative.BaseModel');

lgb.simulation.model.voNative.DefaultExperimentStruct = function(startTime, stopTime, tolerance) {

  this.startTime = startTime || 0.0;
  this.stopTime = stopTime || 0.0;
  this.tolerance = tolerance || 0.0;

};
goog.inherits(lgb.simulation.model.voNative.DefaultExperimentStruct, lgb.simulation.model.voNative.BaseModel);





lgb.simulation.model.voNative.DefaultExperimentStruct.prototype.getJsonObj = function() {
    
    var jsonObj = {
      type:this.getRemoteTypeString(),
      startTime:this.startTime,
      stopTime:this.stopTime,
      tolerance:this.tolerance
    };
    
    return jsonObj;
   
};


lgb.simulation.model.voNative.DefaultExperimentStruct.prototype.toJson = function() {
    
    var jsonObj = this.getJsonObj();
    
    var jsonString = lgb.simulation.controller.JsonController.stringify(jsonObj);
    return jsonString;
};


lgb.simulation.model.voNative.DefaultExperimentStruct.fromJson = function(deserializedObj) {

    var typedObj = new lgb.simulation.model.voNative.DefaultExperimentStruct(
      deserializedObj.startTime,
      deserializedObj.stopTime,
      deserializedObj.tolerance
    );
    
    return typedObj;
};
