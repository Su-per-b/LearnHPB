goog.provide('lgb.simulation.model.voManaged.SessionControl');

goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.SessionControl = function(idx, value) {

  this.idx = idx;
  this.value = value;

};
goog.inherits(lgb.simulation.model.voManaged.SessionControl, lgb.simulation.model.BaseModel);




lgb.simulation.model.voManaged.SessionControl.fieldPrimitivesEx_ = {
   idx: "idx" ,
   value: "value" 
};

