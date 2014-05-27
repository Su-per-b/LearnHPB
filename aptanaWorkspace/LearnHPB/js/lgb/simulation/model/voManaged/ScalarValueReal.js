goog.provide('lgb.simulation.model.voManaged.ScalarValueReal');


goog.require('lgb.simulation.model.BaseModel');

lgb.simulation.model.voManaged.ScalarValueReal = function(idx, value) {

  this.idx_ = idx;
  this.value_ = value;
};
goog.inherits(lgb.simulation.model.voManaged.ScalarValueReal, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.ScalarValueReal.prototype.getIdx = function() {
    return this.idx_;
};

 
lgb.simulation.model.voManaged.ScalarValueReal.prototype.getValue = function() {
    return this.value_;
};



lgb.simulation.model.voManaged.ScalarValueReal.fieldPrimativesEx_ = {
   idx_: "i" ,
   value_: "v" ,
};




