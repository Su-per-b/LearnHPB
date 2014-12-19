goog.provide('lgb.simulation.model.voManaged.InitialState');

goog.require('lgb.simulation.model.BaseModel');



 /**
 * @constructor
 */
lgb.simulation.model.voManaged.InitialState = function(realVarList) {

  this.realVarList_ = realVarList || [];  
    
};
goog.inherits(lgb.simulation.model.voManaged.InitialState, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.InitialState.prototype.getRealVarList = function() {
    
    return this.realVarList_;
};



lgb.simulation.model.voManaged.InitialState.fieldObjectsEx_ = {
  
   realVarList_: {
     jsonFieldName : "realVarList_",
     classReference : lgb.simulation.model.voManaged.SerializableVector,
     itemTypeString : "ScalarVariableReal"
   }
       
};


