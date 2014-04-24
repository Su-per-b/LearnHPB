goog.provide('lgb.simulation.model.voNative.SimStateNative');

goog.require('lgb.simulation.model.BaseModel');

lgb.simulation.model.voNative.SimStateNative = function(intValue) {
  
  if (undefined != intValue) {
    this.setIntValue(intValue);
  }
  lgb.simulation.model.BaseModel.call(this);
};
goog.inherits(lgb.simulation.model.voNative.SimStateNative, lgb.simulation.model.BaseModel);


lgb.simulation.model.voNative.SimStateNative.CLIENT_TRANSITIONS = {
  0 : [1], //simStateNative_0_uninitialized
  1 : [1], //simStateNative_0_uninitialized
  2: [3], //simStateNative_1_connect_completed
  4: [5], //simStateNative_2_xmlParse_completed
  10: [11, 17, 22, 24], //simStateNative_3_ready
  12:[15], //simStateNative_4_run_started
  13: [10], //simStateNative_4_run_completed
  16: [17, 26, 24, 22], //simStateNative_5_stop_completed
  21: [26,22,15] //simStateNative_6_pause_completed
  

};





lgb.simulation.model.voNative.SimStateNative.prototype.setIntValue  = function( intValue ) {
    this.intValue_ = intValue;
};

lgb.simulation.model.voNative.SimStateNative.prototype.getIntValue  = function(  ) {
  return this.intValue_;
};



lgb.simulation.model.voNative.SimStateNative.prototype.getString  = function(  ) {
  var str = lgb.simulation.model.voNative.SimStateNative.TEXT[this.intValue_];
  return str;
};


lgb.simulation.model.voNative.SimStateNative.prototype.canRequestTransitionTo  = function( intValue ) {
  
  // if (enum_arg == 3 ) {
    // debugger;
  // }
//   
  if (lgb.simulation.model.voNative.SimStateNative.CLIENT_TRANSITIONS.hasOwnProperty(this.intValue_)) {
    
    var aryOfValidTransitions = lgb.simulation.model.voNative.SimStateNative.CLIENT_TRANSITIONS[ this.intValue_ ];
    var isValid = $.inArray(intValue, aryOfValidTransitions);
    
    
    if (isValid == -1) {
      return false;
    } else {
      return true;
    }
  } else {
    //debugger;
  }
  
  

  
};



 

lgb.simulation.model.voNative.SimStateNative.TEXT = {
  
  0 : 'uninitialized',
  1: 'connect_requested',
  2: 'connect_completed',
  3: 'xmlParse_requested',
  4: 'xmlParse_completed',
  
  5: 'init_requested',
  6: 'init_dllLoaded',
  7: 'init_instantiatedSlaves',
  8: 'init_initializedSlaves',
  9:'init_completed',
  
  10:'ready',
  
  11:'run_requested',
  12:'run_started',
  13:'run_completed',
  14:'cleanedup',
  
  15:'stop_requested',
  16:'stop_completed',
  
  17:'step_requested',
  18:'step_started',
  19:'step_completed',
  
  20:'pause_requested',
  21:'pause_completed',
  
  22:'terminate_requested',
  23:'terminate_completed',
  
  24:'reset_requested',
  25:'reset_completed',
  
  26:'resume_requested',
  27:'resume_completed',
  
  28:'e_error',
  29:'unknown'
  
};


lgb.simulation.model.voNative.SimStateNative.ENUM = {
  simStateNative_0_uninitialized: 0,
  simStateNative_1_connect_requested: 1,
  simStateNative_1_connect_completed: 2,
  
  simStateNative_2_xmlParse_requested: 3,
  simStateNative_2_xmlParse_completed: 4,

  simStateNative_3_init_requested: 5,
  simStateNative_3_init_dllLoaded: 6,
  simStateNative_3_init_instantiatedSlaves: 7,
  simStateNative_3_init_initializedSlaves: 8,
  simStateNative_3_init_completed: 9,
  
  simStateNative_3_ready: 10,
  
  simStateNative_4_run_requested: 11,
  simStateNative_4_run_started: 12,
  simStateNative_4_run_completed: 13,
  simStateNative_4_run_cleanedup: 14,
  
  simStateNative_5_stop_requested: 15,
  simStateNative_5_stop_completed: 16,
  
  simStateNative_5_step_requested: 17,
  simStateNative_5_step_started: 18,
  simStateNative_5_step_completed: 19,
  
  simStateNative_6_pause_requested: 20,
  simStateNative_6_pause_completed: 21,
  
  simStateNative_7_terminate_requested: 22,
  simStateNative_7_terminate_completed: 23,
  
  simStateNative_7_reset_requested: 24,
  simStateNative_7_reset_completed: 25,
  
  simStateNative_7_resume_requested: 26,
  simStateNative_7_resume_completed: 27,
  
  simStateNative_e_error: 28,
  simStateNative_unknown:29
};



lgb.simulation.model.voNative.SimStateNative.fieldPrimativesEx_ = {
   intValue_: "intValue"
};






