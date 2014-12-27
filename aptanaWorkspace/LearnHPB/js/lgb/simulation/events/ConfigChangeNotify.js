/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ConfigChangeNotify');

goog.require('lgb.simulation.model.voNative.ConfigStruct');
goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @extends {lgb.simulation.events.BaseEvent}
 */
lgb.simulation.events.ConfigChangeNotify = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.ConfigChangeNotify, lgb.simulation.events.BaseEvent);



lgb.simulation.events.ConfigChangeNotify.fieldObjectsEx_ = {
  
   payload_: {
     jsonFieldName : "payload",
     classReference : lgb.simulation.model.voNative.ConfigStruct
   }
       
};