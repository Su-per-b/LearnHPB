goog.provide('lgb.simulation.model.voManaged.ScalarVariableCollection');


goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voManaged.ScalarVariableReal');
goog.require('lgb.simulation.model.voManaged.SerializableVector');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.ScalarVariableCollection = function(realVarList) {
  
  this.realVarList_ = realVarList || [];
  //this.idx2RealVar_ = {};
  
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

lgb.simulation.model.voManaged.ScalarVariableCollection.prototype.getRealVarListConverted2 = function() {
  
  var idx2realVar = {};
  
  var len = this.realVarList_.length;
  for (var i=0; i < len; i++) {
    
    var realVar = this.realVarList_[i];
    var newRealVar;
    
    var unit = realVar.getUnit();
    
    if (unit == "K") {
      newRealVar = new lgb.scenario.model.Temperature();
    } else {
      newRealVar = new lgb.scenario.model.Decimal(); 
    }

    newRealVar.parseVar(realVar);
    
    var idx = realVar.getIdx();
    
    
    realVarListConverted.push(newRealVar);
    
  };
  
  
  return realVarListConverted;
  
  
};



lgb.simulation.model.voManaged.ScalarVariableCollection.prototype.getRealVarListConverted = function() {
  
  var realVarListConverted = [];
  
  var len = this.realVarList_.length;
  for (var i=0; i < len; i++) {
    
    var realVar = this.realVarList_[i];
    var newRealVar;
    
    var unit = realVar.getUnit();
    
    if (unit == "K") {
      newRealVar = new lgb.scenario.model.Temperature();
    } else {
      newRealVar = new lgb.scenario.model.Decimal(); 
    }

    newRealVar.parseVar(realVar);
    realVarListConverted.push(newRealVar);
    
  };
  
  
  return realVarListConverted;
  
  
};



