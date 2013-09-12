/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.BaseEvent');
goog.provide('se.Event');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.model.scenario.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.BaseEvent = function(type, payload) {
    
  goog.events.Event.call( this, type );
  
  this.setPayload(payload);
  
};
goog.inherits(lgb.simulation.events.BaseEvent, goog.events.Event);





lgb.simulation.events.BaseEvent.prototype.getPayload = function() {

    return this.payload_;
};


lgb.simulation.events.BaseEvent.prototype.setPayload = function(payload) {

    this.payload_ = payload;
};


lgb.simulation.events.BaseEvent.prototype.fromJson = function(deserializedObj) {
    
    var typedObj = new lgb.simulation.events.BaseEvent();
    typedObj.setPayload (deserializedObj.payload);
    
    return typedObj;
    
    
    //return deserializedObj;
};

/**
 * Event type
 * @const
 * @type {string}
 */
lgb.simulation.events.BaseEvent.TYPE = 'lgb.simulation.events.BaseEvent';

/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.BaseEvent.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.BaseEvent';


se.Event = function() {};

se.WebSocketChangeRequest = 'se.WebSocketChangeRequest';