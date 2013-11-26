/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.events.BaseEvent');
goog.require('lgb.simulation.model.WebSocketConnectionState');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
lgb.simulation.events.WebSocketConnectionStateEvent = function(payload) {
    
  lgb.simulation.events.BaseEvent.call(this,payload);

};
goog.inherits(lgb.simulation.events.WebSocketConnectionStateEvent, lgb.simulation.events.BaseEvent);



lgb.simulation.events.WebSocketConnectionStateEvent.prototype.fromJson = function(deserializedObj) {
    
    var typedObj = new lgb.simulation.events.WebSocketConnectionStateEvent(deserializedObj.payload);
    return typedObj;
    
};


/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.WebSocketConnectionStateEvent.SERVER_TYPE = null;