/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.serialization.EventController');

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

goog.require('lgb.simulation.model.voManaged.ScalarValueResults');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');

goog.require('lgb.simulation.events.ConfigChangeNotify');
goog.require('lgb.simulation.events.MessageEvent');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.SimStateNativeNotify');
goog.require('lgb.simulation.events.SimStateNativeRequest');
goog.require('lgb.simulation.events.MessageEvent');
goog.require('lgb.simulation.events.XMLparsedEvent');
goog.require('lgb.simulation.events.SessionControlEvent');
goog.require('lgb.simulation.events.ScalarValueChangeRequest');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.serialization.EventController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  this.jsonController_ = new lgb.simulation.controller.JsonController();
  
  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  
};
goog.inherits(test.serialization.EventController, lgb.core.BaseController);



test.serialization.EventController.start = function() {
    
  lgb.init();
  test.serialization.EventController.instance = new test.serialization.EventController();
  
    
};


test.serialization.EventController.prototype.runAll = function() {
  
    module( "Event" );
  
    test("MessageEvent Serialize", 1, this.T01_messageEvent_serialize);
    test("MessageEvent Deserialize", 5, this.T02_messageEvent_deserialize);
    
    test("ConfigChangeNotify Serialize", 1, this.T03_configChangeNotify_serialize);
    test("ConfigChangeNotify Deserialize", 7, this.T04_configChangeNotify_deserialize);
    
    test("ResultEvent Serialize", 8, this.T05_resultEvent_serialize);
    test("ResultEvent Deserialize", 13, this.T06_resultEvent_deserialize);
  
    test("SimStateNativeRequest Serialize", 1, this.T07_simStateNativeRequest_serialize);
    test("SimStateNativeRequest Deserialize", 6, this.T08_simStateNativeRequest_deserialize);
    
    test("SimStateNativeNotify Serialize", 1, this.T09_simStateNativeNotify_serialize);
    test("SimStateNativeNotify Deserialize", 6, this.T10_simStateNativeNotify_deserialize);

    test("XMLparsedEvent Serialize", 1, this.T11_xmlParsedEvent_serialize);
    test("XMLparsedEvent Deserialize", 1, this.T12_xmlParsedEvent_deserialize);
    
    test("ScalarValueChangeRequest Serialize", 1, this.T13_scalarValueChangeRequest_serialize);
    test("ScalarValueChangeRequest Deserialize", 1, this.T14_scalarValueChangeRequest_deserialize);
    
    test("SessionControlEvent Serialize", 1, this.T15_sessionControlClientRequest_serialize);
    test("SessionControlEvent Deserialize", 1, this.T16_sessionControlClientRequest_deserialize);




};


test.serialization.EventController.prototype.T01_messageEvent_serialize = function() {

    var messageType_0 = lgb.simulation.model.voNative.MessageType.messageType_debug;
    
    var messageStruct_0 = new lgb.simulation.model.voNative.MessageStruct(
      "This is the test Message Text", messageType_0);


    var event_0 = new lgb.simulation.events.MessageEvent(messageStruct_0);
    
    
    serializeOk(
      event_0,
      CONST.STR_messageEvent_0
    );
    
      
};



test.serialization.EventController.prototype.T02_messageEvent_deserialize = function() {

    var event_0 = deserializeOk(
      CONST.STR_messageEvent_0,
      simEvents.MessageEvent
    );
    
    assertEquals("MessageEvent", event_0.type);
    var messageStruct_0 = event_0.getPayload();
    
    assertEquals("This is the test Message Text", messageStruct_0.msgText);
    assertEquals(0, messageStruct_0.messageType);
    assertEquals(lgb.simulation.model.voNative.MessageType.messageType_debug, messageStruct_0.messageType);
    
};




test.serialization.EventController.prototype.T03_configChangeNotify_serialize = function() {
  
    var defaultExperimentStruct_0 = new lgb.simulation.model.voNative.DefaultExperimentStruct(123.03, 145.03, 10.0);
    var configStruct_0 = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct_0, 1);
    
    var event_0 = new lgb.simulation.events.ConfigChangeNotify(configStruct_0);
    
    serializeOk(
      event_0,
      CONST.STR_configChangeNotify_0
    );
    
    

    
};


test.serialization.EventController.prototype.T04_configChangeNotify_deserialize = function() {

    var event_0 = deserializeOk(
      CONST.STR_configChangeNotify_0,
      simEvents.ConfigChangeNotify
    );
    
    assertEquals("ConfigChangeNotify", event_0.type);
    var configStruct_0 = event_0.getPayload();
    ok(configStruct_0 instanceof lgb.simulation.model.voNative.ConfigStruct);
    
    assertEquals(1.0, configStruct_0.stepDelta, 0.0);
    
    assertEquals(123.03, configStruct_0.defaultExperimentStruct.startTime, 0.0);
    assertEquals(145.03, configStruct_0.defaultExperimentStruct.stopTime, 0.0);
    assertEquals(10.0, configStruct_0.defaultExperimentStruct.tolerance, 0.0);  
    
};






test.serialization.EventController.prototype.T05_resultEvent_serialize = function() {


    var scalarValueReal_0 = new lgb.simulation.model.voManaged.ScalarValueReal(1, 2.0);
    ok(scalarValueReal_0 instanceof lgb.simulation.model.voManaged.ScalarValueReal);
    
    var scalarValueReal_1 = new lgb.simulation.model.voManaged.ScalarValueReal(2, 3.53);
    ok(scalarValueReal_1 instanceof lgb.simulation.model.voManaged.ScalarValueReal);
    
    
    var realList_0 = [scalarValueReal_0, scalarValueReal_1];
    var scalarValueCollection_0 = new lgb.simulation.model.voManaged.ScalarValueCollection(realList_0);
    ok(scalarValueCollection_0 instanceof lgb.simulation.model.voManaged.ScalarValueCollection);
    
    
    var scalarValueReal_2 = new lgb.simulation.model.voManaged.ScalarValueReal(3, 258.2);
    ok(scalarValueReal_2 instanceof lgb.simulation.model.voManaged.ScalarValueReal);
    
    var scalarValueReal_3 = new lgb.simulation.model.voManaged.ScalarValueReal(4, 78.0);
    ok(scalarValueReal_3 instanceof lgb.simulation.model.voManaged.ScalarValueReal);
    
    
    var realList_1 = [scalarValueReal_2, scalarValueReal_3];
    var scalarValueCollection_1 = new lgb.simulation.model.voManaged.ScalarValueCollection(realList_1);
    ok(scalarValueCollection_1 instanceof lgb.simulation.model.voManaged.ScalarValueCollection);
    

    var scalarValueResults_0 = new lgb.simulation.model.voManaged.ScalarValueResults();
    scalarValueResults_0.time_ = 2800.1;
    scalarValueResults_0.input = scalarValueCollection_0;
    scalarValueResults_0.output = scalarValueCollection_1;
    
    ok(scalarValueResults_0 instanceof lgb.simulation.model.voManaged.ScalarValueResults);
    
    
    var event_0 = new lgb.simulation.events.ResultEvent(scalarValueResults_0);
    
    serializeOk(
      event_0,
      CONST.STR_resultEvent_0
    );
    

};



test.serialization.EventController.prototype.T06_resultEvent_deserialize = function() {

    var event_0 = deserializeOk(
      CONST.STR_resultEvent_0,
      simEvents.ResultEvent
    );
    
    assertEquals("ResultEvent", event_0.type);
    var scalarValueResults_0 = event_0.getPayload();
    ok(scalarValueResults_0 instanceof lgb.simulation.model.voManaged.ScalarValueResults);
    

    var scalarValueCollection_0 = scalarValueResults_0.getInput();
    ok(scalarValueCollection_0 instanceof lgb.simulation.model.voManaged.ScalarValueCollection);
    var realList_0 = scalarValueCollection_0.getRealList();
    
    var scalarValueReal_0 = realList_0[0];
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    
    var scalarValueReal_1 = realList_0[1];
    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(3.530, scalarValueReal_1.getValue(), 0.0);
    
    var scalarValueCollection_1 = scalarValueResults_0.getOutput();
    ok(scalarValueCollection_1 instanceof lgb.simulation.model.voManaged.ScalarValueCollection);
    var realList_1 = scalarValueCollection_1.getRealList();
    
    var scalarValueReal_2 = realList_1[0];
    assertEquals(3, scalarValueReal_2.getIdx());
    assertEquals(258.2, scalarValueReal_2.getValue(), 0.0);
    
    var scalarValueReal_3 = realList_1[1];
    assertEquals(4, scalarValueReal_3.getIdx());
    assertEquals(78.0, scalarValueReal_3.getValue(), 0.0);
    

};







test.serialization.EventController.prototype.T07_simStateNativeRequest_serialize = function() {

    var simStateNativeEnum_0 = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_5_step_requested;
    var simStateNative_0 = new lgb.simulation.model.voNative.SimStateNative(simStateNativeEnum_0);
    
    var event_0 = new lgb.simulation.events.SimStateNativeRequest(simStateNative_0);
    
    serializeOk(
      event_0,
      CONST.STR_simStateNativeRequest_0
    );
    
    

    
};


test.serialization.EventController.prototype.T08_simStateNativeRequest_deserialize = function() {

    var event_0 = deserializeOk(
      CONST.STR_simStateNativeRequest_0,
      simEvents.SimStateNativeRequest
    );
    
    assertEquals("SimStateNativeRequest", event_0.type);
    ok(event_0 instanceof lgb.simulation.events.SimStateNativeRequest);

    var simStateNative_0 = event_0.getPayload();
    ok(simStateNative_0 instanceof lgb.simulation.model.voNative.SimStateNative);
    

    assertEquals(17, simStateNative_0.getIntValue());
    assertEquals("step_requested", simStateNative_0.getString());

};


test.serialization.EventController.prototype.T09_simStateNativeNotify_serialize = function() {

    var simStateNativeEnum_0 = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_3_ready;
    var simStateNative_0 = new lgb.simulation.model.voNative.SimStateNative(simStateNativeEnum_0);
    
    var event_0 = new lgb.simulation.events.SimStateNativeNotify(simStateNative_0);
    
    
    serializeOk(
      event_0,
      CONST.STR_simStateNativeNotify_0
    );
    
    
};



test.serialization.EventController.prototype.T10_simStateNativeNotify_deserialize = function() {

    var event_0 = deserializeOk(
      CONST.STR_simStateNativeNotify_0,
      simEvents.SimStateNativeNotify
    );
    
    assertEquals("SimStateNativeNotify", event_0.type);
    ok(event_0 instanceof lgb.simulation.events.SimStateNativeNotify);
    
    var simStateNative_0 = event_0.getPayload();
    ok(simStateNative_0 instanceof lgb.simulation.model.voNative.SimStateNative);
    
    assertEquals(10, simStateNative_0.getIntValue());
    assertEquals("ready", simStateNative_0.getString());
    
};


test.serialization.EventController.prototype.T11_xmlParsedEvent_serialize = function() {

    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
      
      
    var scalarVariableCollection_0 = test.serialization.VoManagedController.getScalarVariableCollection_A_();
    ok(scalarVariableCollection_0 instanceof lgb.simulation.model.voManaged.ScalarVariableCollection);
    
    var scalarVariableCollection_1 = test.serialization.VoManagedController.getScalarVariableCollection_B_();
    ok(scalarVariableCollection_1 instanceof lgb.simulation.model.voManaged.ScalarVariableCollection);
    
    var scalarVariablesAll_0 = new lgb.simulation.model.voManaged.ScalarVariablesAll();
    scalarVariablesAll_0.setInput(scalarVariableCollection_0);
    scalarVariablesAll_0.setOutput(scalarVariableCollection_1);

    serializeOk(
      scalarVariablesAll_0,
      CONST.STR_scalarVariablesAll_1
    );
    
    
    var xmlParsedInfo = new XMLparsedInfo(scalarVariablesAll);
    
    
};


test.serialization.EventController.prototype.T12_xmlParsedEvent_deserialize = function() {

    ok(true);
    
};


test.serialization.EventController.prototype.T13_scalarValueChangeRequest_serialize = function() {

    ok(true);
    
};


test.serialization.EventController.prototype.T14_scalarValueChangeRequest_deserialize = function() {

    ok(true);
    
};



test.serialization.EventController.prototype.T15_sessionControlClientRequest_serialize = function() {

    ok(true);
    
};

test.serialization.EventController.prototype.T16_sessionControlClientRequest_deserialize = function() {


    ok(true);
    
};









