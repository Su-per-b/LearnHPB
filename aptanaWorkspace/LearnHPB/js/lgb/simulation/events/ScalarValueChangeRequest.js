/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ScalarValueChangeRequest');

goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');


lgb.simulation.events.ScalarValueChangeRequest = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, payload);
};
goog.inherits(lgb.simulation.events.ScalarValueChangeRequest, lgb.simulation.events.BaseEvent);



lgb.simulation.events.ScalarValueChangeRequest.fieldObjectsEx_ = {
  
   payload_: {
     jsonFieldName : "payload",
     classReference : lgb.simulation.model.voManaged.ScalarValueCollection
   }
       
};