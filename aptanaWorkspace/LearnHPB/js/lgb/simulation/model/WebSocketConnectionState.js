/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.WebSocketConnectionState');
goog.provide('lgb.simulation.model.WebSocketConnectionStateRequest');
goog.provide('lgb.simulation.model.WSConnectionState');





/**
 * @constructor
 */
lgb.simulation.model.WSConnectionState = function(enum_arg) {
  
  if (undefined != enum_arg) {
    this.setIntValue(enum_arg);
  }
  
};


lgb.simulation.model.WSConnectionState.prototype.setIntValue  = function( enum_arg ) {
  this.enum_ = enum_arg;
};


lgb.simulation.model.WSConnectionState.prototype.getIntValue  = function(  ) {
  return this.enum_;
};


lgb.simulation.model.WSConnectionState.prototype.getString  = function(  ) {
  var str = lgb.simulation.model.WSConnectionState.TEXT[this.enum_];
  return str;
};


lgb.simulation.model.WSConnectionState.prototype.canRequestTransitionTo  = function( enum_arg ) {
  
  // if (enum_arg == 3 ) {
    // debugger;
  // }
//   
  var aryOfValidTransitions = lgb.simulation.model.WSConnectionState.CLIENT_TRANSITIONS[ this.enum_ ];
  var isValid = $.inArray(enum_arg, aryOfValidTransitions);
  
  
  if (isValid == -1) {
    return false;
  } else {
    return true;
  }
  
};



lgb.simulation.model.WSConnectionState.CLIENT_TRANSITIONS = {
  0 : [2],
  1: [],
  2: [3],
  3: [2],
  4: [],
  5: [],
  6: []
};



lgb.simulation.model.WSConnectionState.TEXT = {
  0 : 'uninitialized',
  1: 'open_requested',
  2: 'opened',
  3: 'closed',
  4: 'timed_out',
  5: 'dropped',
  6: 'error'
};


lgb.simulation.model.WSConnectionState.ENUM = {
  uninitialized: 0,
  open_requested: 1,
  opened: 2,
  closed: 3,
  timed_out: 4,
  dropped: 5,
  error:6
};


/**
 * @enum {number}
 */
lgb.simulation.model.WebSocketConnectionState = {
  uninitialized: 0,
  open_requested: 1,
  opened: 2,
  closed: 3,
  timed_out: 4,
  dropped: 5,
  error:6
};



lgb.simulation.model.WebSocketConnectionStateRequest = {
  open: 0,
  close: 1
};

