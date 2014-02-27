/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.SessionControlEvent');
goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.SessionControlEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, payload);
};
goog.inherits(lgb.simulation.events.SessionControlEvent, lgb.simulation.events.BaseEvent);






lgb.simulation.events.SessionControlEvent.prototype.toJson = function() {
    
    var jsonObj = this.getJsonObjBase();
    
    var payload = this.getPayload();
    
    jsonObj.payload = {
        type : "com.sri.straylight.fmuWrapper.voManaged.SessionControlEvent",
        idx_ : payload.idx,
        value_ : payload.value
    };
    
    var jsonString = JSON.stringify(jsonObj, null, 2);

    jsonString = jsonString.replace(/\s/g, '');
    
    return jsonString;

};



