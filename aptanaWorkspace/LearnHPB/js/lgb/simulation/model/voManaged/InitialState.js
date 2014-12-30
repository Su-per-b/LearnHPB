goog.provide('lgb.simulation.model.voManaged.InitialState');

goog.require('lgb.simulation.model.BaseModel');

goog.require('lgb.simulation.model.voNative.ConfigStruct');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.SerializableVector');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.InitialState = function(parameters, configStruct, outputVarList) {

  this.parameters_ = parameters || [];
  this.configStruct_ = configStruct || [];
  this.outputVarList_ = outputVarList || [];
    
};
goog.inherits(lgb.simulation.model.voManaged.InitialState, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.InitialState.prototype.getParameters = function() {
  return  this.parameters_;
};


lgb.simulation.model.voManaged.InitialState.prototype.getConfigStruct = function() {
  return  this.configStruct_;
};


lgb.simulation.model.voManaged.InitialState.prototype.getOutputVarList = function() {
  return  this.outputVarList_;
};





lgb.simulation.model.voManaged.InitialState.fieldObjectsEx_ = {
  
   parameters_: {
     jsonFieldName : "parameters",
     classReference : lgb.simulation.model.voManaged.ScalarValueCollection
   },
   configStruct_: {
     jsonFieldName : "configStruct",
     classReference : lgb.simulation.model.voNative.ConfigStruct
   },
   outputVarList_: {
     jsonFieldName : "outputVarList",
     classReference : lgb.simulation.model.voManaged.SerializableVector,
     itemTypeString : "StringPrimitive"
   }
       
};
