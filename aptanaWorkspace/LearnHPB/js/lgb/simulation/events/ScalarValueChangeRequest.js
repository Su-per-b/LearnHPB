/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ScalarValueChangeRequest');
goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voNative.SimStateNative');

/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.ScalarValueChangeRequest = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, payload);
};
goog.inherits(lgb.simulation.events.ScalarValueChangeRequest, lgb.simulation.events.BaseEvent);





lgb.simulation.events.ScalarValueChangeRequest.prototype.toJson = function() {
    
    var jsonObj = this.toJsonObj();
    
    var jsonString = JSON.stringify(jsonObj, null, 2);
    jsonString = jsonString.replace(/\s/g, '');
    
    return jsonString;

};


lgb.simulation.events.ScalarValueChangeRequest.prototype.toJsonObj = function() {
  
    var payload = this.getPayload();
    
    var jsonObj = {
      type : lgb.simulation.events.ScalarValueChangeRequest.SERVER_TYPE,
      payload : payload.toJsonObj()
    };
    
    return jsonObj;
};



