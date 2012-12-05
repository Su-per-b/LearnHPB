/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.TestSerializationController');

goog.require('goog.debug.Logger');
goog.require('lgb.events.EventBus');
goog.require('lgb.controller.ControllerBase');

goog.require('lgb.Config');
goog.require('lgb.simulation.controller.MainController');

goog.require('lgb.simulation.events.WebSocketConnectionStateEvent');
goog.require('lgb.simulation.events.SimStateNativeRequest');

goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.controller.JsonController');

/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.controller.ControllerBase
 */
test.TestSerializationController = function() {

  lgb.controller.ControllerBase.call(this);
  
  lgb.globalEventBus = new lgb.events.EventBus();

  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  
  this.jsonController_ = new lgb.simulation.controller.JsonController();
  
};
goog.inherits(test.TestSerializationController, lgb.controller.ControllerBase);




test.TestSerializationController.prototype.runAll = function() {
    
    test("Serialize StateNativeRequest", this.testSimStateNativeRequest);

    
};


test.TestSerializationController.prototype.testSimStateNativeRequest = function() {

    var simStateNative1 = lgb.simulation.model.voNative.SimStateNative.simStateNative_3_init_dllLoaded;
    var event = new lgb.simulation.events.SimStateNativeRequest(simStateNative1);
    
    var json = event.toJson();
    
    
    equal("{\"type\":\"com.sri.straylight.fmuWrapper.event.SimStateNativeRequest\",\"payload\":{\"type\":\"com.sri.straylight.fmuWrapper.voNative.SimStateNative\",\"intValue\":6}}",
                json,
            "Serialized SimStateNativeRequest"    
                );
};






