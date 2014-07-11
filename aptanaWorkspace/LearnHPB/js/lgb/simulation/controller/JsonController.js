/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.simulation.controller.JsonController');


goog.require('lgb.core.BaseController');

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
goog.require('lgb.simulation.model.voNative.TypeSpecReal');

goog.require('lgb.simulation.model.voManaged.ScalarValueResults');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');


goog.require('lgb.simulation.model.voManaged.ScalarVariableReal');
goog.require('lgb.simulation.model.voManaged.ScalarVariableCollection');
goog.require('lgb.simulation.model.voManaged.ScalarVariablesAll');
goog.require('lgb.simulation.model.voManaged.SerializableVector');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');
goog.require('lgb.simulation.model.voManaged.SessionControlModel');



/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgb.simulation.controller.JsonController = function() {
  
    if ( lgb.simulation.controller.JsonController.prototype._singletonInstance ) {
      return lgb.simulation.controller.JsonController.prototype._singletonInstance;
    }
    
    lgb.simulation.controller.JsonController.prototype._singletonInstance = this;
    
    this.deserializeMap_ = {
      
          "ConfigChangeNotify":         lgb.simulation.events.ConfigChangeNotify,  
          "MessageEvent":               lgb.simulation.events.MessageEvent,
          "ResultEvent" :               lgb.simulation.events.ResultEvent,
          "ResultEventList" :           lgb.simulation.events.ResultEventList, 
          "ScalarValueChangeRequest" :  lgb.simulation.events.ScalarValueChangeRequest, 
          "SessionControlEvent" :       lgb.simulation.events.SessionControlEvent, 
          "SimStateNativeNotify":       lgb.simulation.events.SimStateNativeNotify,
          "SimStateNativeRequest":      lgb.simulation.events.SimStateNativeRequest,
          "XMLparsedEvent":             lgb.simulation.events.XMLparsedEvent,
          "SessionControlClientRequest" : lgb.simulation.events.SessionControlClientRequest,
          
          "ConfigStruct" :              lgb.simulation.model.voNative.ConfigStruct,
          "DefaultExperimentStruct" :   lgb.simulation.model.voNative.DefaultExperimentStruct,
          "MessageStruct" :             lgb.simulation.model.voNative.MessageStruct,
          "MessageType" :               lgb.simulation.model.voNative.MessageType,
          "ScalarValueRealStruct" :     lgb.simulation.model.voNative.ScalarValueRealStruct,
          "SimStateNative" :            lgb.simulation.model.voNative.SimStateNative,
          "TypeSpecReal" :              lgb.simulation.model.voNative.TypeSpecReal,
          
          "ScalarValueResults" :        lgb.simulation.model.voManaged.ScalarValueResults,
          "ScalarValueReal" :           lgb.simulation.model.voManaged.ScalarValueReal,
          "ScalarValueCollection" :     lgb.simulation.model.voManaged.ScalarValueCollection,   
          "ScalarVariableReal" :        lgb.simulation.model.voManaged.ScalarVariableReal,
          "ScalarVariableCollection" :  lgb.simulation.model.voManaged.ScalarVariableCollection,
          "ScalarVariablesAll" :        lgb.simulation.model.voManaged.ScalarVariablesAll,
          "XMLparsedInfo" :             lgb.simulation.model.voManaged.XMLparsedInfo,
          "SessionControlAction" :      lgb.simulation.model.voManaged.SessionControlAction,
          "SessionControlModel" :       lgb.simulation.model.voManaged.SessionControlModel,
          "SerializableVector" :        lgb.simulation.model.voManaged.SerializableVector

    };


  return;
};
goog.inherits(lgb.simulation.controller.JsonController, lgb.core.BaseController);





lgb.simulation.controller.JsonController.getShortClassName = function(deserializedObj) {
  
    var type = deserializedObj.type;
    
    var ary = type.split(".");
    var eventTypeShort = ary.pop();
  
    return eventTypeShort;
};







lgb.simulation.controller.JsonController.prototype.getClass = function(deserializedObj) {
  
   // var eventTypeShort = lgb.simulation.controller.JsonController.getShortClassName(deserializedObj);

    var classNameStr = deserializedObj.t;
    
    if (this.deserializeMap_.hasOwnProperty(classNameStr)) {
      
      var classReference = this.deserializeMap_[classNameStr];
      return classReference;
      
      
    } else {
      debugger;
       //throw ("JsonController.deserialize() failed due to unknown type: "+ classNameStr);
    }
    
    
};



lgb.simulation.controller.JsonController.prototype.deserialize = function(jsonString) {


    var deserializedObj = JSON && JSON.parse(jsonString) || $.parseJSON(jsonString);
    var typedObj = this.makeTyped(deserializedObj);
      
    return typedObj;


};

lgb.simulation.controller.JsonController.prototype.makeTyped = function(deserializedObj) {

    var classReference = this.getClass(deserializedObj);
    
    var instance = new classReference();
    
    
    if (undefined != instance.makeTyped) {
      instance.makeTyped(deserializedObj);
    }
  
  
    if (deserializedObj.hasOwnProperty("payload")) {
      
      var typedPayload = this.makeTyped(deserializedObj.payload);
      instance.setPayload (typedPayload);
      
    }
    
    
  
  if (undefined != classReference.fieldPrimitivesEx_) {
    
    var fieldPrimitivesEx = classReference.fieldPrimitivesEx_;

    for(var jsFieldName in fieldPrimitivesEx) {
      
      var jsonFieldName = fieldPrimitivesEx[jsFieldName];
      instance[jsFieldName] = deserializedObj[jsonFieldName];
      
    }
  }
  
  if (undefined != classReference.fieldObjectsEx_) {
    
    var fieldObjectsEx = classReference.fieldObjectsEx_;

    for(var jsFieldName in fieldObjectsEx) {
      
      var fieldObject = fieldObjectsEx[jsFieldName];   
      var jsonFieldName = fieldObject.jsonFieldName;
      
      if (!fieldObject.hasOwnProperty('classReference')) { 
         debugger;
      }
      
      var fieldClassReference = fieldObject.classReference;
      
      
      if (undefined == fieldClassReference) {
        debugger;
      }
      
      var childDeserializedObj = deserializedObj[jsonFieldName];
      
      

      
      if (null != childDeserializedObj) { 
        
        //var childTypedObject = new fieldClassReference();
        
        var childTypedObject = this.makeTyped(childDeserializedObj);
        
        
        if (fieldClassReference == lgb.simulation.model.voManaged.SerializableVector) {
        
          instance[jsFieldName] = childTypedObject.toArray();
          
        } else {

          instance[jsFieldName] = childTypedObject;
          
        }
      
      }

    }
    
  }
  
  
    
    return instance;
    
};

lgb.simulation.controller.JsonController.serialize = function(jsonObj) {

    var jsonString = JSON.stringify(jsonObj, null, 0);
   // jsonString = jsonString.replace(/\s/g, '');
    
    return jsonString;
    
};




