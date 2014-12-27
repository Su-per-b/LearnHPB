/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.MessageEvent');

goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.MessageType');

/**
 * @constructor
 * @extends {lgb.simulation.events.BaseEvent}
 */
lgb.simulation.events.MessageEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};
goog.inherits(lgb.simulation.events.MessageEvent, lgb.simulation.events.BaseEvent);



lgb.simulation.events.MessageEvent.fieldObjectsEx_ = {
  
   payload_: {
     jsonFieldName : "payload",
     classReference : lgb.simulation.model.voNative.MessageStruct
   }
       
};