goog.provide('lgb.simulation.model.voNative.ConfigStruct');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voNative.DefaultExperimentStruct');


lgb.simulation.model.voNative.ConfigStruct  = function(defaultExperimentStruct, stepDelta) {
  
  this.stepDelta = stepDelta;
  this.defaultExperimentStruct = defaultExperimentStruct;
  
  lgb.simulation.model.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.ConfigStruct, lgb.simulation.model.BaseModel);





lgb.simulation.model.voNative.ConfigStruct.fieldPrimativesEx_ = {
   stepDelta: "stepDelta"
};


lgb.simulation.model.voNative.ConfigStruct.fieldObjectsEx_ = {
  
   defaultExperimentStruct: {
     jsonFieldName : "defaultExperimentStruct",
     classReference : lgb.simulation.model.voNative.DefaultExperimentStruct
   }
   
};



