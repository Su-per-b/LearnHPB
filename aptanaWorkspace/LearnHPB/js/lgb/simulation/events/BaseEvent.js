/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.BaseEvent');
goog.provide('se.Event');

goog.require('goog.events.Event');

/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.BaseEvent = function(payload) {
    
 var fullClassName = this.getFullClassName();
 
  goog.events.Event.call( this, fullClassName );
  
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
    
};



/**
 * Server type
 * @const
 * @type {string}
 */
lgb.simulation.events.BaseEvent.SERVER_TYPE = 'com.sri.straylight.fmuWrapper.event.BaseEvent';


se.Event = function() {};

se.BaseEvent = 'lgb.simulation.events.BaseEvent';
se.WebSocketChangeRequest = 'lgb.simulation.events.WebSocketChangeRequest';
se.SimStateNativeNotify = 'lgb.simulation.events.SimStateNativeNotify';
se.XMLparsedEvent = 'lgb.simulation.events.XMLparsedEvent';
se.ResultEvent = 'lgb.simulation.events.ResultEvent';
se.MessageEvent = 'lgb.simulation.events.MessageEvent';
se.RequestModelicaVariableChange = 'lgb.simulation.events.RequestModelicaVariableChange';
se.ConfigChangeNotify = 'lgb.simulation.events.ConfigChangeNotify';
se.SimStateNativeRequest = 'lgb.simulation.events.SimStateNativeRequest';


