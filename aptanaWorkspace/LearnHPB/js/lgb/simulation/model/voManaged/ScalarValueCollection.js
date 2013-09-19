goog.provide('lgb.simulation.model.voManaged.ScalarValueCollection');

goog.require('lgb.simulation.model.voManaged.ScalarValueReal');

lgb.simulation.model.voManaged.ScalarValueCollection = function(realList, booleanList) {
  

  this.valueList_ = [];
  this.realList_ = realList || [];
  this.booleanList_ = booleanList || [];

};


lgb.simulation.model.voManaged.ScalarValueCollection.fromJson = function(deserializedObj) {

    var typedObj = new lgb.simulation.model.voManaged.ScalarValueCollection();
   
    return typedObj;

};




lgb.simulation.model.voManaged.ScalarValueCollection.prototype.toJsonObj = function() {
    
    
    var realobjs = this.getJsonObjs(this.realList_);
    var boolobjs = this.getJsonObjs(this.booleanList_);
    
    var jsonObj = {
      type : lgb.simulation.model.voManaged.ScalarValueCollection.SERVER_TYPE,
      realList : realobjs,
      booleanList : boolobjs
    };
    
    
    return jsonObj;

};



lgb.simulation.model.voManaged.ScalarValueCollection.prototype.getJsonObjs = function(theList) {
  
    var objs = [];
    var len = this.realList_.length;
    
    for (var i=0; i < len; i++) {
      var jsonObj = this.realList_[i].toJsonObj();
      objs.push(jsonObj);
    };
  
  return objs;
  
};



lgb.simulation.model.voManaged.ScalarValueCollection.SERVER_TYPE =
'com.sri.straylight.fmuWrapper.voManaged.ScalarValueCollection';

