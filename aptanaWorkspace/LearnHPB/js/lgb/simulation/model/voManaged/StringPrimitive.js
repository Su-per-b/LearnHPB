goog.provide('lgb.simulation.model.voManaged.StringPrimitive');

goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.StringPrimitive = function(value) {

  this.value_ = value;

};
goog.inherits(lgb.simulation.model.voManaged.StringPrimitive, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.StringPrimitive.prototype.getValue = function() {
    return this.value_;
};

lgb.simulation.model.voManaged.StringPrimitive.prototype.toString = function() {
    return this.value_;
};


lgb.simulation.model.voManaged.StringPrimitive.fieldPrimitivesEx_ = {
   value_: "v" 
};

