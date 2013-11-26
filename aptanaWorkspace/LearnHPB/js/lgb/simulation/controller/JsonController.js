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
    
    this.classMap  = {};
    
    this.initClass_(new lgb.simulation.events.MessageEvent());
    this.initClass_(new lgb.simulation.events.SimStateNativeNotify());
    this.initClass_(new lgb.simulation.events.ConfigChangeNotify());
    this.initClass_(new lgb.simulation.events.XMLparsedEvent());
    this.initClass_(new lgb.simulation.events.ResultEvent());
    this.initClass_(new lgb.simulation.events.ScalarValueChangeRequest());
    this.initClass_(new lgb.simulation.events.SimStateNativeRequest());
    
    
    this.payloadClassMap_ = {
      "com.sri.straylight.fmuWrapper.voNative.SimStateNative" : lgb.simulation.events.SimStateNativeNotify
      
    };
    

    
    this.deserializeEventMap_ = {
      "com.sri.straylight.fmuWrapper.event.SimStateNativeNotify":lgb.simulation.events.SimStateNativeNotify
    };
    
    this.deserializePayloadMap_ = {
      "com.sri.straylight.fmuWrapper.voNative.SimStateNative":lgb.simulation.model.voNative.SimStateNative
    };
    
};



lgb.simulation.controller.JsonController.prototype.initClass_ = function(instance) {
  
  var name = instance.getFullClassName();
  this.classMap[name] = instance;
  
};




lgb.simulation.controller.JsonController.prototype.deSerialize = function(jsonString) {


    var deserializedObj = JSON && JSON.parse(jsonString) || $.parseJSON(jsonString);
    
    var eventType = deserializedObj.type;
    var eventClass = this.deserializeEventMap_[eventType];
    
    if (! eventClass ) {
        throw ("JsonController.deSerialize() failed due to unknwon type: "+ typeStr);
    }
    
    var typedObj = eventClass.fromJson(deserializedObj);
    
   
      
    return typedObj;


};


