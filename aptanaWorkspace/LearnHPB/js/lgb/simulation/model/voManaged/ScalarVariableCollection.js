goog.provide('lgb.simulation.model.voManaged.ScalarVariableCollection');


goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.ScalarVariableReal');
goog.require('lgb.simulation.model.voManaged.SerializableVector');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.ScalarVariableCollection = function(realVarList) {
  
  this.realVarList_ = realVarList || [];

};
goog.inherits(lgb.simulation.model.voManaged.ScalarVariableCollection, lgb.simulation.model.BaseModel);




lgb.simulation.model.voManaged.ScalarVariableCollection.prototype.setRealVarList = function(realVarList) {
  this.realVarList_ = realVarList;
};


lgb.simulation.model.voManaged.ScalarVariableCollection.prototype.getRealVarList = function() {
  return this.realVarList_;
};






lgb.simulation.model.voManaged.ScalarVariableCollection.fieldObjectsEx_ = {
  
   realVarList_: {
     jsonFieldName : "realVarList_",
     classReference : lgb.simulation.model.voManaged.SerializableVector,
     itemTypeString : "ScalarVariableReal"
   }
       
};



