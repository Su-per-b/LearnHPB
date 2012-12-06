/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.model.WebSocketConnectionState');

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

