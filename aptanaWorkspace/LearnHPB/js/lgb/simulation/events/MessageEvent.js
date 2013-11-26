/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.MessageEvent');

goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.MessageType');

/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.MessageEvent = function(payload) {
  lgb.simulation.events.BaseEvent.call(this,  payload);
};
goog.inherits(lgb.simulation.events.MessageEvent, lgb.simulation.events.BaseEvent);



lgb.simulation.events.MessageEvent.prototype.fromJson = function(deserializedObj) {
   
    var payload = new lgb.simulation.model.voNative.MessageStruct(
        deserializedObj.payload.msgText,
        deserializedObj.payload.messageType
    );
    
    var typedObj = new lgb.simulation.events.MessageEvent(payload);
    return typedObj;

};



lgb.simulation.events.MessageEvent.fromJson = function(deserializedObj) {
   
    var payload = new lgb.simulation.model.voNative.MessageStruct(
        deserializedObj.payload.msgText,
        deserializedObj.payload.messageType
    );
    
    var typedObj = new lgb.simulation.events.MessageEvent(payload);
    return typedObj;

};


/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.MessageEvent.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.MessageEvent';