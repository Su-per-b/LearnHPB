/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.InitialStateRequest');


goog.require('lgb.simulation.events.BaseEvent');
//goog.require('lgb.simulation.model.voManaged.InitialState');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');



/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.simulation.events.InitialStateRequest = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.InitialStateRequest, lgb.simulation.events.BaseEvent);



lgb.simulation.events.InitialStateRequest.prototype.getPayloadType = function() {
  return lgb.simulation.model.voManaged.ScalarValueCollection;
};


