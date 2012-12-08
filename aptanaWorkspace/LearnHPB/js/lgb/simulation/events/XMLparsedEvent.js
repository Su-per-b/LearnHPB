/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.XMLparsedEvent');

goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.XMLparsedEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this, lgb.simulation.events.XMLparsedEvent.TYPE,  payload);
};

goog.inherits(lgb.simulation.events.XMLparsedEvent, lgb.simulation.events.BaseEvent);





lgb.simulation.events.XMLparsedEvent.prototype.fromJson = function(deserializedObj) {
    

    var payload =  lgb.simulation.model.voManaged.XMLparsedInfo.fromJson(deserializedObj.payload);
    var typedObj = new lgb.simulation.events.XMLparsedEvent(payload);
    
    return typedObj;
    
};


/**
 * Event type
 * @const
 * @type {string}
 */
lgb.simulation.events.XMLparsedEvent.TYPE = 'lgb.simulation.events.XMLparsedEvent';

/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.XMLparsedEvent.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.XMLparsedEvent';