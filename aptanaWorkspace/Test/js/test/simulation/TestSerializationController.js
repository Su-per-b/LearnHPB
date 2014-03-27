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
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.model.WebSocketConnectionState');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.controller.JsonController');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.SimStateNativeNotify');
goog.require('lgb.simulation.model.voNative.SimStateNativeEnum');



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



test.simulation.TestSerializationController.start = function() {
    
  lgb.init();
  test.simulation.TestSerializationController.instamce = new test.simulation.TestSerializationController();
  
    
};


test.simulation.TestSerializationController.prototype.runAll = function() {
    
   // module( "module StateNativeRequest" );
   
    test("Serialize DefaultExperimentStruct", 1, this.serialize_DefaultExperimentStruct);
    test("Deserialize DefaultExperimentStruct", 4, this.deserialize_DefaultExperimentStruct);
   
    test("Serialize ConfigStruct", 1, this.serialize_ConfigStruct);
    test("Deserialize ConfigStruct", 5, this.deserialize_ConfigStruct);
        
    test("Serialize SimStateNative", 1, this.serialize_SimStateNative);
    test("Deserialize SimStateNative", 1, this.deserialize_SimStateNative);
    
    test("Serialize SimStateNativeRequest", 1, this.serialize_SimStateNativeRequest);
    test("Deserialize SimStateNativeRequest", 2, this.deserialize_SimStateNativeRequest);
    
    test("Serialize SimStateNativeNotify", 1, this.serialize_SimStateNativeNotify);
    test("Deserialize SimStateNativeNotify", 2, this.deserialize_SimStateNativeNotify);
};


test.simulation.TestSerializationController.prototype.serialize_DefaultExperimentStruct = function() {
    var struct = new lgb.simulation.model.voNative.DefaultExperimentStruct(0.0, 100.0, 1.1);
    var jsonString = struct.toJson();
    
    equal(
      jsonString,
      '{"type":"com.sri.straylight.fmuWrapper.voNative.DefaultExperimentStruct","startTime":0,"stopTime":100,"tolerance":1.1}'
    );
};

test.simulation.TestSerializationController.prototype.deserialize_DefaultExperimentStruct = function() {
  
    var jsonString = '{"type":"com.sri.straylight.fmuWrapper.voNative.DefaultExperimentStruct","startTime":0,"stopTime":100,"tolerance":1.1}';
    var struct = lgb.simulation.controller.JsonController().deSerialize(jsonString);
    
    ok(struct instanceof lgb.simulation.model.voNative.DefaultExperimentStruct);
    equal(struct.startTime, 0);
    equal(struct.stopTime, 100);
    equal(struct.tolerance, 1.1);
    
};


test.simulation.TestSerializationController.prototype.serialize_ConfigStruct = function() {
  
    var defaultExperimentStruct = new lgb.simulation.model.voNative.DefaultExperimentStruct(0.0, 100.0, 1.1);
    var struct = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct, 1);
    
    var jsonString = struct.toJson();
    
    equal(
      jsonString,
      '{"type":"com.sri.straylight.fmuWrapper.voNative.ConfigStruct","stepDelta":1,"defaultExperimentStruct":{"type":"com.sri.straylight.fmuWrapper.voNative.DefaultExperimentStruct","startTime":0,"stopTime":100,"tolerance":1.1}}'
    );
};




test.simulation.TestSerializationController.prototype.deserialize_ConfigStruct = function() {
  
    var jsonString = '{"type":"com.sri.straylight.fmuWrapper.voNative.ConfigStruct","stepDelta":1,"defaultExperimentStruct":{"type":"com.sri.straylight.fmuWrapper.voNative.DefaultExperimentStruct","startTime":0,"stopTime":100,"tolerance":1.1}}';
    var configStruct = lgb.simulation.controller.JsonController().deSerialize(jsonString);
    var defaultExperimentStruct = configStruct.defaultExperimentStruct;
    
    
    ok(configStruct instanceof lgb.simulation.model.voNative.ConfigStruct);
    
    equal(configStruct.stepDelta, 1);
    equal(defaultExperimentStruct.startTime, 0);
    equal(defaultExperimentStruct.stopTime, 100);
    equal(defaultExperimentStruct.tolerance, 1.1);
    
};






test.simulation.TestSerializationController.prototype.serialize_SimStateNative = function() {

    var theEnum = lgb.simulation.model.voNative.SimStateNativeEnum.simStateNative_3_init_requested;
    var simStateNative = new lgb.simulation.model.voNative.SimStateNative(theEnum);
    var jsonString = simStateNative.toJson();
    
    equal(
      jsonString,
      '{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":5}'
    );
    
};

test.simulation.TestSerializationController.prototype.deserialize_SimStateNative = function() {

    var jsonString = '{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":17}';
    
    var simStateNative = lgb.simulation.controller.JsonController().deSerialize(jsonString);
    ok(simStateNative instanceof lgb.simulation.model.voNative.SimStateNative);
    
};




test.simulation.TestSerializationController.prototype.serialize_SimStateNativeRequest = function() {

    var simStateNativeEnum = lgb.simulation.model.voNative.SimStateNativeEnum.simStateNative_5_step_requested;
    var simStateNative = new lgb.simulation.model.voNative.SimStateNative(simStateNativeEnum);
    
    var event = new lgb.simulation.events.SimStateNativeRequest(simStateNative);
    var jsonString = event.toJson();
    
    equal(
      jsonString,
      '{"type":"com.sri.straylight.fmuWrapper.event.SimStateNativeRequest","payload":{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":17}}'  
    );
    
    
};


test.simulation.TestSerializationController.prototype.deserialize_SimStateNativeRequest = function() {

    var jsonString = '{"type":"com.sri.straylight.fmuWrapper.event.SimStateNativeRequest","payload":{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":17}}';
    

    var event = lgb.simulation.controller.JsonController().deSerialize(jsonString);
    
    equal(event.type, "lgb.simulation.events.SimStateNativeRequest");
    ok(event instanceof lgb.simulation.events.SimStateNativeRequest);


    return;   
};


test.simulation.TestSerializationController.prototype.serialize_SimStateNativeNotify = function() {

    var simStateNativeEnum = lgb.simulation.model.voNative.SimStateNativeEnum.simStateNative_5_step_requested;
    var simStateNative = new lgb.simulation.model.voNative.SimStateNative(simStateNativeEnum);
    
    var event = new lgb.simulation.events.SimStateNativeNotify(simStateNative);
    var jsonString = event.toJson();
    
    equal(
      jsonString,
      '{"type":"com.sri.straylight.fmuWrapper.event.SimStateNativeNotify","payload":{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":17}}'
    );

};


test.simulation.TestSerializationController.prototype.deserialize_SimStateNativeNotify = function() {

    var jsonString = '{"type":"com.sri.straylight.fmuWrapper.event.SimStateNativeNotify","payload":{"type":"com.sri.straylight.fmuWrapper.voNative.SimStateNative","intValue":17}}';
    var event = lgb.simulation.controller.JsonController().deSerialize(jsonString);
    
    equal(event.type, "lgb.simulation.events.SimStateNativeNotify");
    ok(event instanceof lgb.simulation.events.SimStateNativeNotify);
    
};


