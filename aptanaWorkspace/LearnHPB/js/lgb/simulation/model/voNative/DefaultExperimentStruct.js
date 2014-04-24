goog.provide('lgb.simulation.model.voNative.DefaultExperimentStruct');

goog.require('lgb.simulation.model.BaseModel');

lgb.simulation.model.voNative.DefaultExperimentStruct = function(startTime, stopTime, tolerance) {

  this.startTime = startTime || 0.0;
  this.stopTime = stopTime || 0.0;
  this.tolerance = tolerance || 0.0;

  lgb.simulation.model.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.DefaultExperimentStruct, lgb.simulation.model.BaseModel);



lgb.simulation.model.voNative.DefaultExperimentStruct.fieldPrimativesEx_ = {
   startTime: "startTime" ,
   stopTime: "stopTime" ,
   tolerance: "tolerance" 
};

