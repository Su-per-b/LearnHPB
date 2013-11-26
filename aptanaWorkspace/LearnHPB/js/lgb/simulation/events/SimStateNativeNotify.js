/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.SimStateNativeNotify');

goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.SimStateNativeNotify = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.SimStateNativeNotify, lgb.simulation.events.BaseEvent);





lgb.simulation.events.SimStateNativeNotify.prototype.fromJson = function(deserializedObj) {
    
    var payload =  deserializedObj.payload.intValue;
    
    var typedObj = new lgb.simulation.events.SimStateNativeNotify(payload);
    return typedObj;
    
};


lgb.simulation.events.SimStateNativeNotify.fromJson = function(deserializedObj) {
    
    var intValue =  deserializedObj.payload.intValue;
    
    var instance = new lgb.simulation.events.SimStateNativeNotify(intValue);
    return instance;
    
};



/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.SimStateNativeNotify.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.SimStateNativeNotify';