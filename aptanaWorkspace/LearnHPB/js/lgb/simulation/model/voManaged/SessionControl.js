goog.provide('lgb.simulation.model.voManaged.SessionControl');




lgb.simulation.model.voManaged.SessionControl = function(idx, value) {

  this.idx = idx;
  this.value = value;

};


lgb.simulation.model.voManaged.SessionControl.prototype.toJsonObj = function() {
    
    var jsonObj = {
      type : "com.sri.straylight.fmuWrapper.voManaged.SessionControl",
      idx_ : this.idx,
      value_ : this.value 
    };
    
    return jsonObj;

};