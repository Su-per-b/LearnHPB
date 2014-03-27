/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.controller.JsonController');


goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.MessageEvent');
goog.require('lgb.simulation.events.ResultEvent');
goog.require('lgb.simulation.events.ResultEventList');
goog.require('lgb.simulation.events.ScalarValueChangeRequest');
goog.require('lgb.simulation.events.SessionControlEvent');
goog.require('lgb.simulation.events.SimStateNativeNotify');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.XMLparsedEvent');

goog.require('lgb.simulation.model.voNative.ConfigStruct');
goog.require('lgb.simulation.model.voNative.DefaultExperimentStruct');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.MessageType');
goog.require('lgb.simulation.model.voNative.ScalarValueRealStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');






lgb.simulation.controller.JsonController = function() {
  
    if ( lgb.simulation.controller.JsonController.prototype._singletonInstance ) {
      return lgb.simulation.controller.JsonController.prototype._singletonInstance;
    }
    
    lgb.simulation.controller.JsonController.prototype._singletonInstance = this;

};


goog.inherits(lgb.simulation.controller.JsonController, lgb.core.BaseController);





lgb.simulation.controller.JsonController.getShortClassName = function(deserializedObj) {
  
    var type = deserializedObj.type;
    
    var ary = type.split(".");
    var eventTypeShort = ary.pop();
  
    return eventTypeShort;
};







lgb.simulation.controller.JsonController.getClass = function(deserializedObj) {
  
    var eventTypeShort = lgb.simulation.controller.JsonController.getShortClassName(deserializedObj);
    var map = lgb.simulation.controller.JsonController.deserializeMap_;
    
    if (map.hasOwnProperty(eventTypeShort)) {
      
      var eventClass = map[eventTypeShort];
      
      var staticFunctionMissing = (!eventClass.fromJson);
      var normalFunctionMissing = (!eventClass.prototype.fromJson);
      
      
      if (staticFunctionMissing &&  normalFunctionMissing) {
          throw ("JsonController.deSerialize() failed due to missing fromJson function in class: "+ eventTypeShort);
      } else {
        return eventClass;
      }
      
    } else {
       throw ("JsonController.deSerialize() failed due to unknown type: "+ eventTypeShort);
    }
    
    
};



lgb.simulation.controller.JsonController.prototype.deSerialize = function(jsonString) {


    var deserializedObj = JSON && JSON.parse(jsonString) || $.parseJSON(jsonString);

    var eventClass = lgb.simulation.controller.JsonController.getClass(deserializedObj);
    
    var staticFunctionMissing = (!eventClass.fromJson);
    var normalFunctionMissing = (!eventClass.prototype.fromJson);
    
    var typedObj;
    if (normalFunctionMissing) {
      typedObj = eventClass.fromJson(deserializedObj);
    } else {
      
      typedObj = new eventClass();
      typedObj.fromJson(deserializedObj);
    }

    
    return typedObj;


};


lgb.simulation.controller.JsonController.stringify = function(jsonObj) {

    var jsonString = JSON.stringify(jsonObj, null, 2);
    jsonString = jsonString.replace(/\s/g, '');
    
    return jsonString;
    
};



lgb.simulation.controller.JsonController.deserializeMap_ = {
      "ConfigChangeNotify":lgb.simulation.events.ConfigChangeNotify,
      "MessageEvent": lgb.simulation.events.MessageEvent,
      "ResultEvent" : lgb.simulation.events.ResultEvent,
      "ResultEventList" : lgb.simulation.events.ResultEventList, 
      "ScalarValueChangeRequest" : lgb.simulation.events.ScalarValueChangeRequest, 
      "SessionControlEvent" : lgb.simulation.events.SessionControlEvent, 
      "SimStateNativeNotify":lgb.simulation.events.SimStateNativeNotify,
      "SimStateNativeRequest":lgb.simulation.events.SimStateNativeRequest,
      "XMLparsedEvent": lgb.simulation.events.XMLparsedEvent,
      "ConfigStruct" : lgb.simulation.model.voNative.ConfigStruct,
      "DefaultExperimentStruct" : lgb.simulation.model.voNative.DefaultExperimentStruct,
      "MessageStruct" : lgb.simulation.model.voNative.MessageStruct,
      "MessageType" : lgb.simulation.model.voNative.MessageType,
      "ScalarValueRealStruct" : lgb.simulation.model.voNative.ScalarValueRealStruct,
      "SimStateNative" : lgb.simulation.model.voNative.SimStateNative
};


