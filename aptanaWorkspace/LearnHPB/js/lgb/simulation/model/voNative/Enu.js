goog.provide('lgb.simulation.model.voNative.Enu');

goog.require('lgb.simulation.model.BaseModel');


 /**
 * @constructor
 */
lgb.simulation.model.voNative.Enu = function(enumInteger) {
  
  this.intValue_ = 0;
  
  if (undefined != enumInteger) {
    this.setIntValue(enumInteger);
  }
  lgb.simulation.model.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.Enu, lgb.simulation.model.BaseModel);



lgb.simulation.model.voNative.Enu.prototype.setIntValue  = function( intValue ) {
    this.intValue_ = intValue;
};

lgb.simulation.model.voNative.Enu.prototype.getIntValue  = function(  ) {
  return this.intValue_;
};


lgb.simulation.model.voNative.Enu.prototype.toString  = function(  ) {
  var str = lgb.simulation.model.voNative.Enu.TEXT[this.intValue_];
  return str;
};



 
lgb.simulation.model.voNative.Enu.TEXT = {
  
  0 : 'flat',
  1: 'structured',
  2: 'constant',
  3: 'parameter',
  4: 'discrete',
  
  5: 'continuous',
  6: 'input',
  7: 'output',
  8: 'internal',
  9:'none',
  
  10:'noAlias',
  
  11:'alias',
  12:'negatedAlias'
  
};


lgb.simulation.model.voNative.Enu.ENUM = {
  enu_flat: 0,
  enu_structured: 1,
  enu_constant: 2,
  
  enu_parameter: 3,
  enu_discrete: 4,

  enu_continuous: 5,
  enu_input: 6,
  enu_output: 7,
  enu_internal: 8,
  enu_none: 9,
  
  enu_noAlias: 10,
  
  enu_alias: 11,
  enu_negatedAlias: 12
};



lgb.simulation.model.voNative.Enu.fieldPrimitivesEx_ = {
   intValue_: "intValue" 
};





