/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.events.MessageEvent');
goog.require('lgb.simulation.events.SimStateNativeNotify');
goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.XMLparsedEvent');
goog.require('lgb.simulation.events.ResultEvent');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.model.voNative.MessageStruct');


lgb.simulation.controller.JsonController = function() {

  this.init_();
};
goog.inherits(lgb.simulation.controller.JsonController, lgb.core.BaseController);


/**
 * @private
 */
lgb.simulation.controller.JsonController.prototype.init_ = function() {
  
  

    
    

};



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
      
      if (! eventClass.fromJson ) {
          throw ("JsonController.deSerialize() failed due to missing fromJson function: "+ eventType);
      } else {
        return eventClass;
      }
      
    } else {
       throw ("JsonController.deSerialize() failed due to unknown type: "+ eventType);
    }
    
    
};



lgb.simulation.controller.JsonController.prototype.deSerialize = function(jsonString) {


    var deserializedObj = JSON && JSON.parse(jsonString) || $.parseJSON(jsonString);

    var eventClass = lgb.simulation.controller.JsonController.getClass(deserializedObj);
    var typedObj = eventClass.fromJson(deserializedObj);
    
    return typedObj;


};




lgb.simulation.controller.JsonController.deserializeMap_ = {
      "SimStateNativeNotify":lgb.simulation.events.SimStateNativeNotify,
      "MessageEvent": lgb.simulation.events.MessageEvent,
      "XMLparsedEvent": lgb.simulation.events.XMLparsedEvent,
      "ConfigChangeNotify" : lgb.simulation.events.ConfigChangeNotify,
      "ResultEvent" : lgb.simulation.events.ResultEvent

};



