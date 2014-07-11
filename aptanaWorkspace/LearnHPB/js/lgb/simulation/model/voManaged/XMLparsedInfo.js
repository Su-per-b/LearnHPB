goog.provide('lgb.simulation.model.voManaged.XMLparsedInfo');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.ScalarVariablesAll');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.XMLparsedInfo = function(scalarVariablesAll) {

  this.scalarVariablesAll_ = scalarVariablesAll;
  this.sessionID_ = "{not set}";

};
goog.inherits(lgb.simulation.model.voManaged.XMLparsedInfo, lgb.simulation.model.BaseModel);





lgb.simulation.model.voManaged.XMLparsedInfo.prototype.getInputVariables = function() {

   var input = this.scalarVariablesAll_.getInput();
   var realVarList = input.getRealVarList();
   
   return realVarList;
   
};


lgb.simulation.model.voManaged.XMLparsedInfo.prototype.getOutputVariables = function() {

   var output = this.scalarVariablesAll_.getOutput();
   var realVarList = output.getRealVarList();
   
   return realVarList;
   
};





lgb.simulation.model.voManaged.XMLparsedInfo.fieldPrimitivesEx_ = {
   sessionID_: "sessionID_" 
};



lgb.simulation.model.voManaged.XMLparsedInfo.fieldObjectsEx_ = {
  
   scalarVariablesAll_: {
     jsonFieldName : "scalarVariablesAll_",
     classReference : lgb.simulation.model.voManaged.ScalarVariablesAll
   }
   
};



