/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.ConfigChangeNotify');

goog.require('lgb.simulation.events.BaseEvent');


/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.ConfigChangeNotify = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};

goog.inherits(lgb.simulation.events.ConfigChangeNotify, lgb.simulation.events.BaseEvent);




lgb.simulation.events.ConfigChangeNotify.fromJson = function(deserializedObj) {
    
    var struct = deserializedObj.payload.defaultExperimentStruct;
    
    var payload =  {
        stepDelta : deserializedObj.payload.stepDelta,
        defaultExperimentStruct : {
            startTime : struct.startTime,
            stopTime : struct.stopTime,
            tolerance : struct.tolerance
        }
    };

    
    var typedObj = new lgb.simulation.events.ConfigChangeNotify(payload);
    return typedObj;
    
};



/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.ConfigChangeNotify.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.ConfigChangeNotify';