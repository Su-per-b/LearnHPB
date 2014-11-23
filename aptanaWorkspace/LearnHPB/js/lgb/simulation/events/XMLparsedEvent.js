/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.XMLparsedEvent');

goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.simulation.events.XMLparsedEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.XMLparsedEvent, lgb.simulation.events.BaseEvent);



lgb.simulation.events.XMLparsedEvent.prototype.getPayloadType = function() {
  return lgb.simulation.model.voManaged.XMLparsedInfo;
};