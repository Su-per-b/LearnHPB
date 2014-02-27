goog.provide('lgb.simulation.model.voManaged.XMLparsedInfo');



lgb.simulation.model.voManaged.XMLparsedInfo = function() {


  this.scalarVariablesAll_ = null;
  this.sessionID_ = null;

  

};


lgb.simulation.model.voManaged.XMLparsedInfo.fromJson = function(deserializedObj) {

    
    var typedObj = new lgb.simulation.model.voManaged.XMLparsedInfo();
    
    typedObj.scalarVariablesAll_ = deserializedObj.scalarVariablesAll_;
    typedObj.sessionID_ = deserializedObj.sessionID_;
    
    return typedObj;

};




