/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voNative.SimStateNative');

/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.SimStateNativeRequest = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, payload);
};
goog.inherits(lgb.simulation.events.SimStateNativeRequest, lgb.simulation.events.BaseEvent);






lgb.simulation.events.SimStateNativeRequest.prototype.toJson = function() {
    

    var jsonObj = this.getJsonObjBase();
    
    
    jsonObj.payload = {
        type : "com.sri.straylight.fmuWrapper.voNative.SimStateNative",
        intValue : this.getPayload()
    };
    
    var jsonString = JSON.stringify(jsonObj, null, 2);

    jsonString = jsonString.replace(/\s/g, '');
    
    return jsonString;

};



