/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.SessionControlEvent');
goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.simulation.events.SessionControlEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, payload);
};
goog.inherits(lgb.simulation.events.SessionControlEvent, lgb.simulation.events.BaseEvent);



 
lgb.simulation.events.SessionControlEvent.prototype.getPayloadType = function() {
  return lgb.simulation.model.voManaged.SessionControl;
};