/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.voNative.SimStateNativeEnum');



/**
 * @enum {number}
 */
lgb.simulation.model.voNative.SimStateNativeEnum = {
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



