/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.simulation.TestSerializationController');

goog.require('goog.debug.Logger');
goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');
goog.require('lgb.core.BaseController');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.controller.MainController');
goog.require('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.controller.JsonController');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.SimStateNativeNotify');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.simulation.TestSerializationController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  this.jsonController_ = new lgb.simulation.controller.JsonController();
  
  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  

  
};
goog.inherits(test.simulation.TestSerializationController, lgb.core.BaseController);




test.simulation.TestSerializationController.prototype.runAll = function() {
    
   // module( "module StateNativeRequest" );
    test("Serialize StateNativeRequest", 1, this.serialize_SimStateNativeRequest);
    test("DeSerialize StateNativeRequest", 2, this.deserialize_SimStateNativeNotify);
    
};


test.simulation.TestSerializationController.prototype.serialize_SimStateNativeRequest = function() {

    var simStateNative1 = lgb.simulation.model.voNative.SimStateNative.simStateNative_3_init_dllLoaded;
    var event = new lgb.simulation.events.SimStateNativeRequest(simStateNative1);
    
    var jsonString = event.toJson();
    
    
    equal("{\"type\":\"com.sri.straylight.fmuWrapper.event.SimStateNativeRequest\",\"payload\":{\"type\":\"com.sri.straylight.fmuWrapper.voNative.SimStateNative\",\"intValue\":6}}",
                jsonString,
            "Serialized SimStateNativeRequest"    
                );
};



test.simulation.TestSerializationController.prototype.deserialize_SimStateNativeNotify = function() {

    var jsonString = '{"type":"com.sri.straylight.fmuWrapper.event.SimStateNativeNotify","payload":{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":0}}';
    
    var result = that.jsonController_.deSerialize(jsonString);
    
    
    equal(result.type, "lgb.simulation.events.SimStateNativeNotify");
    
    ok(result instanceof lgb.simulation.events.SimStateNativeNotify);


    return;   
};




