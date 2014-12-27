/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.events.BaseEvent');
goog.provide('se.Event');

goog.require('goog.events.Event');
goog.require('lgb.core.BaseClass');
goog.require('goog.asserts');


/**
 * @constructor
 * @extends {lgb.simulation.events.BaseEvent}
 */
lgb.simulation.events.BaseEvent = function(payload) {
  
  
  var type = this.getFullClassName();
  goog.events.Event.call(this,  type);
  
  if (undefined != payload) {
    this.setPayload(payload);
  }

  
};
goog.inherits(lgb.simulation.events.BaseEvent, goog.events.Event);


lgb.simulation.events.BaseEvent.prototype.getClassConstructor = lgb.core.BaseClass.prototype.getClassConstructor;


lgb.simulation.events.BaseEvent.prototype.getPayloadType = function() {
    
  var classReference = this.getClassConstructor();
  return classReference.fieldObjectsEx_.payload_.classReference;
};


lgb.simulation.events.BaseEvent.prototype.getPayload = function() {

    return this.payload_;
};


lgb.simulation.events.BaseEvent.prototype.setPayload = function(payload) {
  
    var payloadType = this.getPayloadType();
    goog.asserts.assertInstanceof(payload, payloadType);

    this.payload_ = payload;
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




se.Event = function() {};

se.BaseEvent = 'lgb.simulation.events.BaseEvent';
se.WebSocketChangeRequest = 'lgb.simulation.events.WebSocketChangeRequest';
se.WebSocketChangeNotify = 'lgb.simulation.events.WebSocketChangeNotify';

se.SimStateNativeRequest = 'lgb.simulation.events.SimStateNativeRequest';
se.SimStateNativeNotify = 'lgb.simulation.events.SimStateNativeNotify';

se.XMLparsedEvent = 'lgb.simulation.events.XMLparsedEvent';
se.ResultEvent = 'lgb.simulation.events.ResultEvent';
se.MessageEvent = 'lgb.simulation.events.MessageEvent';
se.RequestSimulationVariableChange = 'lgb.simulation.events.RequestSimulationVariableChange';
se.ConfigChangeNotify = 'lgb.simulation.events.ConfigChangeNotify';

se.SetRemoteHost = 'lgb.simulation.events.SetRemoteHost';
se.ResultEventList = 'lgb.simulation.events.ResultEventList';
se.InitialStateRequest = 'lgb.simulation.events.InitialStateRequest';
