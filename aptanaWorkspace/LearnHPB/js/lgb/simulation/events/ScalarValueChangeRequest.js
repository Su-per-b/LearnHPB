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
  lgb.simulation.events.BaseEvent.call(this, lgb.simulation.events.ScalarValueChangeRequest.TYPE,  payload);
};
goog.inherits(lgb.simulation.events.ScalarValueChangeRequest, lgb.simulation.events.BaseEvent);





lgb.simulation.events.ScalarValueChangeRequest.prototype.toJson = function() {
    
    var jsonObj = {};
    
    jsonObj.type = lgb.simulation.events.ScalarValueChangeRequest.SERVER_TYPE;
    
    jsonObj.payload = {
        type : "com.sri.straylight.fmuWrapper.voNative.ScalarValueRealStruct",
        scalarValueList : this.getPayload()
    };
    
    var jsonString = JSON.stringify(jsonObj, null, 2);

    jsonString = jsonString.replace(/\s/g, '');
    
    return jsonString;

};



/**
 * Event type
 * @const
 * @type {string}
 */
lgb.simulation.events.ScalarValueChangeRequest.TYPE = 'lgb.simulation.events.ScalarValueChangeRequest';

/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.ScalarValueChangeRequest.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.ScalarValueChangeRequest';