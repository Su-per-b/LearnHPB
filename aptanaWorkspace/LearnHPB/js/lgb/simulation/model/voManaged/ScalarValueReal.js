goog.provide('lgb.simulation.model.voManaged.ScalarValueReal');


goog.require('lgb.simulation.model.BaseModel');

 /**
 * @constructor
 */
lgb.simulation.model.voManaged.ScalarValueReal = function(idx, value) {

  this.idx_ = idx;
  this.value_ = value;
  
  
};
goog.inherits(lgb.simulation.model.voManaged.ScalarValueReal, lgb.simulation.model.BaseModel);


lgb.simulation.model.voManaged.ScalarValueReal.prototype.setStruct = function(scalarValueRealStruct) {
  
  this.idx_ = scalarValueRealStruct.idx;
  this.value_ = scalarValueRealStruct.value;
  
};

lgb.simulation.model.voManaged.ScalarValueReal.prototype.getIdx = function() {
    return this.idx_;
};

 
lgb.simulation.model.voManaged.ScalarValueReal.prototype.getValue = function() {
    return this.value_;
};



lgb.simulation.model.voManaged.ScalarValueReal.fieldPrimitivesEx_ = {
   idx_: "i" ,
   value_: "v"
};




