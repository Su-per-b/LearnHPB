/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.BaseEvent');
goog.provide('se.Event');

goog.require('goog.events.Event');
goog.require('lgb.simulation.controller.JsonController');
goog.require('goog.asserts');


/**
 * @constructor
 * @param {lgb.scenario.model.Base} scenarioBase The Data Model.
 * @extends {goog.events.Event}
 */
lgb.simulation.events.BaseEvent = function(payload) {
  
  
  var type = this.getFullClassName();
  goog.events.Event.call( this,  type);
  
  if (undefined != payload) {
    this.setPayload(payload);
  }

  
};
goog.inherits(lgb.simulation.events.BaseEvent, goog.events.Event);





//must implement in subclass
lgb.simulation.events.BaseEvent.prototype.getPayloadType = function() { debugger;};




lgb.simulation.events.BaseEvent.prototype.getPayload = function() {

    return this.payload_;
};


lgb.simulation.events.BaseEvent.prototype.setPayload = function(payload) {
  
    var payloadType = this.getPayloadType();
    goog.asserts.assertInstanceof(payload, payloadType);

    this.payload_ = payload;
};


lgb.simulation.events.BaseEvent.prototype.getClassName = function() {
  
  var fullClassName = this.getFullClassName();
  var ary = fullClassName.split('.');
  
  var len = ary.length;
  var className = ary[len-1];
  
  return className;
};




lgb.simulation.events.BaseEvent.prototype.toJSON = function() { 
    return this.toJSONHelper_();
};

lgb.simulation.events.BaseEvent.prototype.toJSONHelper_ = function() {
    
    var jsonObj = {
      t:this.getClassName(),
      payload:this.payload_
    };
    
    return jsonObj;
};



lgb.simulation.events.BaseEvent.prototype.fromJSON = function(deserializedObj) {
  this.fromJSONHelper_(deserializedObj);
};



lgb.simulation.events.BaseEvent.prototype.fromJSONHelper_ = function(deserializedObj) {
    
  var payloadClassReference = this.getPayloadType();
  this.payload_ = new payloadClassReference();
  
  this.payload_.fromJSON(deserializedObj.payload);
  
};





se.Event = function() {};

se.BaseEvent = 'lgb.simulation.events.BaseEvent';
se.WebSocketChangeRequest = 'lgb.simulation.events.WebSocketChangeRequest';
se.WebSocketChangeNotify = 'lgb.simulation.events.WebSocketChangeNotify';

se.SimStateNativeRequest = 'lgb.simulation.events.SimStateNativeRequest';
se.SimStateNativeNotify = 'lgb.simulation.events.SimStateNativeNotify';

se.XMLparsedEvent = 'lgb.simulation.events.XMLparsedEvent';
se.ResultEvent = 'lgb.simulation.events.ResultEvent';
se.MessageEvent = 'lgb.simulation.events.MessageEvent';
se.RequestModelicaVariableChange = 'lgb.simulation.events.RequestModelicaVariableChange';
se.ConfigChangeNotify = 'lgb.simulation.events.ConfigChangeNotify';

se.SetRemoteHost = 'lgb.simulation.events.SetRemoteHost';
