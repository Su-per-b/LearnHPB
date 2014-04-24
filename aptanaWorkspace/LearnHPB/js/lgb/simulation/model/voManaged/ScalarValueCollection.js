goog.provide('lgb.simulation.model.voManaged.ScalarValueCollection');


goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.model.voManaged.SerializableVector');


lgb.simulation.model.voManaged.ScalarValueCollection = function(realList) {
  
  this.realList_ = realList;

};
goog.inherits(lgb.simulation.model.voManaged.ScalarValueCollection, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.ScalarValueCollection.prototype.getRealList = function() {
  return  this.realList_;
};



lgb.simulation.model.voManaged.ScalarValueCollection.fieldObjectsEx_ = {
  
   realList_: {
     jsonFieldName : "realList",
     classReference : lgb.simulation.model.voManaged.SerializableVector,
     itemTypeString : "ScalarValueReal"
   }
       
};


