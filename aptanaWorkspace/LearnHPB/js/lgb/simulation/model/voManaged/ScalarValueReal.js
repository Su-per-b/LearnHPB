goog.provide('lgb.simulation.model.voManaged.ScalarValueReal');




lgb.simulation.model.voManaged.ScalarValueReal = function(idx, value) {

  this.idx = idx;
  this.value = value;

};


lgb.simulation.model.voManaged.ScalarValueReal.prototype.toJsonObj = function() {
    
    var jsonObj = {
      type : "com.sri.straylight.fmuWrapper.voManaged.ScalarValueReal",
      idx_ : this.idx,
      value_ : this.value 
    };
    
    return jsonObj;

};