/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ResultEventList');

goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @extends {lgb.simulation.events.BaseEvent}
 */
lgb.simulation.events.ResultEventList = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.ResultEventList, lgb.simulation.events.BaseEvent);





lgb.simulation.events.ResultEventList.fieldObjectsEx_ = {
  
   payload_: {
     jsonFieldName : "payload",
     classReference : Array
   }
       
};