/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.SimStateNativeNotify');
goog.require('lgb.simulation.events.BaseEvent');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.SimStateNativeNotify = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, lgb.simulation.events.SimStateNativeNotify.TYPE,  payload);
};
goog.inherits(lgb.simulation.events.SimStateNativeNotify, lgb.simulation.events.BaseEvent);





lgb.simulation.events.SimStateNativeNotify.prototype.fromJson = function(deserializedObj) {
    
     var typedObj = new lgb.simulation.events.SimStateNativeNotify(deserializedObj.payload);
    return typedObj;
    
};


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.simulation.events.SimStateNativeNotify.TYPE = 'lgb.simulation.events.SimStateNativeNotify';

/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.SimStateNativeNotify.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.SimStateNativeNotify';