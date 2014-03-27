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




lgb.simulation.model.voManaged.ScalarValueCollection.prototype.getJsonObj = function() {
    
    
    var realobjs = this.getJsonObjList(this.realList_);
    var boolobjs = this.getJsonObjList(this.booleanList_);
    
    var jsonObj = {
      type : 'com.sri.straylight.fmuWrapper.voManaged.ScalarValueCollection',
      realList : realobjs,
      booleanList : boolobjs
    };
    
    
    return jsonObj;

};



lgb.simulation.model.voManaged.ScalarValueCollection.prototype.getJsonObjList = function(theList) {
  
    var objs = [];
    var len = theList.length;
    
    for (var i=0; i < len; i++) {
      var jsonObj = theList[i].toJsonObj();
      objs.push(jsonObj);
    };
  
  return objs;
  
};


