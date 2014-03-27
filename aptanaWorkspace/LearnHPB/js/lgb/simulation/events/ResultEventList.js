/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ResultEventList');

goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.ResultEventList = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.ResultEventList, lgb.simulation.events.BaseEvent);




 
lgb.simulation.events.ResultEventList.prototype.getPayloadType = function() {
  return Array;
};