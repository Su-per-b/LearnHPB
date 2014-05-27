/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.serialization.VoNativeController');

goog.require('test.main.CONSTANTS');
goog.require('test.serialization.main.global');

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
    
    test("T01 DefaultExperimentStruct Serialize", 2, this.T01_defaultExperimentStruct_serialize);
    test("T02 DefaultExperimentStruct Deserialize", 8, this.T02_defaultExperimentStruct_deserialize);
   
    test("T03 ConfigStruct Serialize", 1, this.T03_configStruct_serialize);
    test("T04 ConfigStruct Deserialize", 6, this.T04_configStruct_serialize);
    
    test("T05 MessageStruct Serialize", 1, this.T05_configStruct_serialize);
    test("T06 MessageStruct Deserialize", 4, this.T06_configStruct_serialize);
    
    test("T07 SimStateNative Serialize", 1, this.T07_configStruct_serialize);
    test("T08 SimStateNative Deserialize", 3, this.T08_configStruct_serialize);
    
    test("T09 TypeSpecReal Serialize", 1, this.T09_configStruct_serialize);
    test("T10 TypeSpecReal Deserialize", 6, this.T10_configStruct_serialize);
    
};




test.serialization.VoNativeController.prototype.T01_defaultExperimentStruct_serialize = function() {
    
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



test.serialization.VoNativeController.prototype.T02_defaultExperimentStruct_deserialize = function() {
  
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



test.serialization.VoNativeController.prototype.T03_configStruct_serialize = function() {
  
    var defaultExperimentStruct_0 = new lgb.simulation.model.voNative.DefaultExperimentStruct(123.03, 145.03, 10.0);
    var configStruct_0 = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct_0, 1);
    
    
    serializeOk(
      configStruct_0,
      CONST.STR_configStruct_0
    );
    
};


test.serialization.VoNativeController.prototype.T04_configStruct_serialize = function() {


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



test.serialization.VoNativeController.prototype.T05_configStruct_serialize = function() {


    var messageType = lgb.simulation.model.voNative.MessageType.messageType_debug;
    
    var messageStruct = new lgb.simulation.model.voNative.MessageStruct(
      "This is the message text", messageType);
    
    serializeOk(
      messageStruct,
      CONST.STR_messageStruct_0
    );
    
};



test.serialization.VoNativeController.prototype.T06_configStruct_serialize = function() {

    var messageStruct_0 = deserializeOk(
      CONST.STR_messageStruct_0,
      voNative.MessageStruct
    );
    
    assertEquals(0, messageStruct_0.messageType);
    assertEquals(lgb.simulation.model.voNative.MessageType.messageType_debug, messageStruct_0.messageType);
    
    assertEquals("This is the message text", messageStruct_0.msgText);
    
};





test.serialization.VoNativeController.prototype.T07_configStruct_serialize = function() {

    var theEnum = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized;
    var simStateNative_0 = new lgb.simulation.model.voNative.SimStateNative(theEnum);
    
    
    serializeOk(
      simStateNative_0,
      CONST.STR_simStateNative_0
    );
    

    
};

test.serialization.VoNativeController.prototype.T08_configStruct_serialize = function() {


    var simStateNative_0 = deserializeOk(
      CONST.STR_simStateNative_0,
      voNative.SimStateNative
    );
    
    assertEquals(0, simStateNative_0.getIntValue());
    assertEquals(lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_0_uninitialized, simStateNative_0.getIntValue());

    
};


test.serialization.VoNativeController.prototype.T09_configStruct_serialize= function() {
  
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




test.serialization.VoNativeController.prototype.T10_configStruct_serialize= function() {
  
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













