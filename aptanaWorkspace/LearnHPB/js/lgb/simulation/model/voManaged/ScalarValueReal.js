goog.provide('lgb.simulation.model.voManaged.ScalarValueReal');


goog.require('lgb.simulation.model.BaseModel');

lgb.simulation.model.voManaged.ScalarValueReal = function(idx, value) {

  this.idx = idx;
  this.value = value;
};
goog.inherits(lgb.simulation.model.voManaged.ScalarValueReal, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.ScalarValueReal.prototype.getIdx = function() {
    return this.idx;
};

 
lgb.simulation.model.voManaged.ScalarValueReal.prototype.getValue = function() {
    return this.value;
};



lgb.simulation.model.voManaged.ScalarValueReal.fieldPrimativesEx_ = {
   idx: "i" ,
   value: "v" ,
};




