goog.provide('lgb.simulation.model.voManaged.SessionControlAction');

goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voManaged.SessionControlAction = function(enumInteger) {

  this.intValue_ = 0;
  
  if (undefined != enumInteger) {
    this.setIntValue(enumInteger);
  }
  lgb.simulation.model.BaseModel.call(this);

};
goog.inherits(lgb.simulation.model.voManaged.SessionControlAction, lgb.simulation.model.BaseModel);



lgb.simulation.model.voManaged.SessionControlAction.prototype.setIntValue  = function( intValue ) {
    this.intValue_ = intValue;
};

lgb.simulation.model.voManaged.SessionControlAction.prototype.getIntValue  = function(  ) {
  return this.intValue_;
};


lgb.simulation.model.voManaged.SessionControlAction.prototype.toString  = function(  ) {
  var str = lgb.simulation.model.voManaged.SessionControl.TEXT[this.intValue_];
  return str;
};



lgb.simulation.model.voManaged.SessionControlAction.fieldPrimitivesEx_ = {
   idx: "idx" ,
   value: "value" 
};

lgb.simulation.model.voManaged.SessionControlAction.TEXT = {
  
  0 : 'attachToSession',
  1: 'getInfo'
  
};


lgb.simulation.model.voManaged.SessionControlAction.ENUM = {

  attachToSession: 0,
  getInfo: 1
  
};



lgb.simulation.model.voManaged.SessionControlAction.fieldPrimitivesEx_ = {
   intValue_: "intValue" 
};


