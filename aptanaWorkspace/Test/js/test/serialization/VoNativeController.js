/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.serialization.VoNativeController');

goog.require('test.CONSTANTS');
goog.require('test.serialization.global');

goog.require('goog.debug.Logger');
goog.require('lgb');
goog.require('lgb.core.EventBus');
goog.require('lgb.core.Global');
goog.require('lgb.core.BaseController');
goog.require('lgb.core.Config');
goog.require('lgb.simulation.controller.MainController');

goog.require('lgb.simulation.model.voNative.ConfigStruct');
goog.require('lgb.simulation.model.voNative.DefaultExperimentStruct');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.SimStateNative');
goog.require('lgb.simulation.model.voNative.MessageStruct');
goog.require('lgb.simulation.model.voNative.MessageType');
goog.require('lgb.simulation.model.voNative.ScalarValueRealStruct');
goog.require('lgb.simulation.model.voNative.TypeSpecReal');

goog.require('lgb.simulation.controller.JsonController');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.serialization.VoNativeController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  this.jsonController_ = new lgb.simulation.controller.JsonController();
  
  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  
};
goog.inherits(test.serialization.VoNativeController, lgb.core.BaseController);



test.serialization.VoNativeController.start = function() {
    
  lgb.init();
  test.serialization.VoNativeController.instance = new test.serialization.VoNativeController();

};



test.serialization.VoNativeController.prototype.runAll = function() {
    
    module( "VoNative" );
    
    test("DefaultExperimentStruct Serialize", 2, this.defaultExperimentStruct_serialize);
    test("DefaultExperimentStruct Deserialize", 8, this.defaultExperimentStruct_deserialize);
   
    test("ConfigStruct Serialize", 1, this.configStruct_serialize);
    test("ConfigStruct Deserialize", 6, this.configStruct_deserialize);
    
    test("MessageStruct Serialize", 1, this.messageStruct_serialize);
    test("MessageStruct Deserialize", 4, this.messageStruct_deserialize);
    
    test("SimStateNative Serialize", 1, this.simStateNative_serialize);
    test("SimStateNative Deserialize", 3, this.simStateNative_deserialize);
    
    test("TypeSpecReal Serialize", 1, this.typeSpecReal_serialize);
    test("TypeSpecReal Deserialize", 6, this.typeSpecReal_deserialize);
    
};




test.serialization.VoNativeController.prototype.defaultExperimentStruct_serialize = function() {
    
    var defaultExperimentStruct_0 = new lgb.simulation.model.voNative.DefaultExperimentStruct();
    
    defaultExperimentStruct_0.startTime = 123.03;
    defaultExperimentStruct_0.stopTime = 145.03;
    defaultExperimentStruct_0.tolerance = 10.0;
    
    
    serializeOk(
      defaultExperimentStruct_0,
      CONST.STR_defaultExperimentStruct_0
    );
    
    var defaultExperimentStruct_1 = new lgb.simulation.model.voNative.DefaultExperimentStruct(0.0, 100.0, 1.1);
    
    serializeOk(
      defaultExperimentStruct_1,
      CONST.STR_defaultExperimentStruct_1
    );
    
};



test.serialization.VoNativeController.prototype.defaultExperimentStruct_deserialize = function() {
  
    var defaultExperimentStruct_0 = deserializeOk(
      CONST.STR_defaultExperimentStruct_0,
      voNative.DefaultExperimentStruct
    );
    
    assertEquals(123.03, defaultExperimentStruct_0.startTime, 0.0);
    assertEquals(145.03, defaultExperimentStruct_0.stopTime, 0.0);
    assertEquals(10.0, defaultExperimentStruct_0.tolerance, 0.0);
    
    var defaultExperimentStruct_1 = deserializeOk(
      CONST.STR_defaultExperimentStruct_1,
      voNative.DefaultExperimentStruct
    );
    
    assertEquals(0.0, defaultExperimentStruct_1.startTime, 0.0);
    assertEquals(100.0, defaultExperimentStruct_1.stopTime, 0.0);
    assertEquals(1.1, defaultExperimentStruct_1.tolerance, 0.0);
    
};



test.serialization.VoNativeController.prototype.configStruct_serialize = function() {
  
    var defaultExperimentStruct_0 = new lgb.simulation.model.voNative.DefaultExperimentStruct(123.03, 145.03, 10.0);
    var configStruct_0 = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct_0, 1);
    
    
    serializeOk(
      configStruct_0,
      CONST.STR_configStruct_0
    );
    
};


test.serialization.VoNativeController.prototype.configStruct_deserialize = function() {


    var configStruct_0 = deserializeOk(
      CONST.STR_configStruct_0,
      voNative.ConfigStruct
    );
    
    var defaultExperimentStruct_0 = configStruct_0.defaultExperimentStruct;
    ok(defaultExperimentStruct_0 instanceof voNative.DefaultExperimentStruct);
    
    assertEquals(1.0, configStruct_0.stepDelta, 0.0);
   
    assertEquals(123.03, defaultExperimentStruct_0.startTime, 0.0);
    assertEquals(145.03, defaultExperimentStruct_0.stopTime, 0.0);
    assertEquals(10.0, defaultExperimentStruct_0.tolerance, 0.0);
    
};



test.serialization.VoNativeController.prototype.messageStruct_serialize = function() {


    var messageType = lgb.simulation.model.voNative.MessageType.messageType_debug;
    
    var messageStruct = new lgb.simulation.model.voNative.MessageStruct(
      "This is the message text", messageType);
    
    serializeOk(
      messageStruct,
      CONST.STR_messageStruct_0
    );
    
};



test.serialization.VoNativeController.prototype.messageStruct_deserialize = function() {

    var messageStruct_0 = deserializeOk(
      CONST.STR_messageStruct_0,
      voNative.MessageStruct
    );
    
    assertEquals(0, messageStruct_0.messageType);
    assertEquals(lgb.simulation.model.voNative.MessageType.messageType_debug, messageStruct_0.messageType);
    
    assertEquals("This is the message text", messageStruct_0.msgText);
    
};





test.serialization.VoNativeController.prototype.simStateNative_serialize = function() {

    var theEnum = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized;
    var simStateNative_0 = new lgb.simulation.model.voNative.SimStateNative(theEnum);
    
    
    serializeOk(
      simStateNative_0,
      CONST.STR_simStateNative_0
    );
    

    
};

test.serialization.VoNativeController.prototype.simStateNative_deserialize = function() {


    var simStateNative_0 = deserializeOk(
      CONST.STR_simStateNative_0,
      voNative.SimStateNative
    );
    
    assertEquals(0, simStateNative_0.getIntValue());
    assertEquals(lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized, simStateNative_0.getIntValue());

    
};


test.serialization.VoNativeController.prototype.typeSpecReal_serialize= function() {
  
    var typeSpecReal_0 = new lgb.simulation.model.voNative.TypeSpecReal();
    typeSpecReal_0.start = 20.25;
    typeSpecReal_0.nominal = 21.25;
    typeSpecReal_0.min = 22.25;
    typeSpecReal_0.max = 23.25;
    typeSpecReal_0.unit = "K";
    
    typeSpecReal_0.startValueStatus = 1;
    typeSpecReal_0.nominalValueStatus = 1;
    typeSpecReal_0.minValueStatus = 1;
    typeSpecReal_0.maxValueStatus = 1;
    typeSpecReal_0.unitValueStatus = 1;

    serializeOk(
      typeSpecReal_0,
      CONST.STR_typeSpecReal_0
    );
    
};




test.serialization.VoNativeController.prototype.typeSpecReal_deserialize= function() {
  
    var typeSpecReal_0 = deserializeOk(
      CONST.STR_typeSpecReal_0,
      voNative.TypeSpecReal
    );
    
    assertEquals(20.25, typeSpecReal_0.start, 0.0);
    assertEquals(21.25, typeSpecReal_0.nominal, 0.0);
    assertEquals(22.25, typeSpecReal_0.min, 0.0);
    assertEquals(23.25, typeSpecReal_0.max, 0.0);
    assertEquals("K", typeSpecReal_0.unit);
    
    
};













