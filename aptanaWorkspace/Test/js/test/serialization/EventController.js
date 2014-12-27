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
goog.require('lgb.simulation.events.SessionControlClientRequest');
goog.require('lgb.simulation.events.InitialStateRequest');

goog.require('test.main.TestDataGenerator');

goog.require('lgb.simulation.model.voManaged.SerializableVector');
goog.require('lgb.simulation.model.voManaged.SessionControlAction');
goog.require('lgb.simulation.model.voManaged.SessionControlModel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.serialization.EventController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  this.jsonController_ = lgb.simulation.controller.JsonController.getInstance();
  
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

    test("XMLparsedEvent Serialize", 5, this.T11_xmlParsedEvent_serialize);
    test("XMLparsedEvent Deserialize", 19, this.T12_xmlParsedEvent_deserialize);
    
    test("ScalarValueChangeRequest Serialize", 1, this.T13_scalarValueChangeRequest_serialize);
    test("ScalarValueChangeRequest Deserialize", 5, this.T14_scalarValueChangeRequest_deserialize);
    
    test("SessionControlEvent Serialize", 1, this.T15_sessionControlClientRequest_serialize);
    test("SessionControlEvent Deserialize", 5, this.T16_sessionControlClientRequest_deserialize);
    
    test("InitialStateRequest Serialize", 1, this.T17_initialStateRequest_serialize);
    test("InitialStateRequest Deserialize", 6, this.T18_initialStateRequest_deserialize);

};



test.serialization.EventController.prototype.T01_messageEvent_serialize = function() {

    var messageType_0 = lgb.simulation.model.voNative.MessageType.messageType_debug;
    
    var messageStruct_0 = new lgb.simulation.model.voNative.MessageStruct(
      "This is the test Message Text", messageType_0);


    var event_0 = new simEvents.MessageEvent(messageStruct_0);
    
    
    Util.serializeOk(
      event_0,
      CONSTANTS.STR_messageEvent_0
    );
    
      
};



test.serialization.EventController.prototype.T02_messageEvent_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_messageEvent_0,
      simEvents.MessageEvent
    );
    
    assertEquals("lgb.simulation.events.MessageEvent", event_0.type);
    var messageStruct_0 = event_0.getPayload();
    
    assertEquals("This is the test Message Text", messageStruct_0.msgText);
    assertEquals(0, messageStruct_0.messageType);
    assertEquals(lgb.simulation.model.voNative.MessageType.messageType_debug, messageStruct_0.messageType);
    
};




test.serialization.EventController.prototype.T03_configChangeNotify_serialize = function() {
  
    var defaultExperimentStruct_0 = new lgb.simulation.model.voNative.DefaultExperimentStruct(123.03, 145.03, 10.0);
    var configStruct_0 = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct_0, 1);
    
    var event_0 = new simEvents.ConfigChangeNotify(configStruct_0);
    
    Util.serializeOk(
      event_0,
      CONSTANTS.STR_configChangeNotify_0
    );
    
    

    
};


test.serialization.EventController.prototype.T04_configChangeNotify_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_configChangeNotify_0,
      simEvents.ConfigChangeNotify
    );
    
    assertEquals("lgb.simulation.events.ConfigChangeNotify", event_0.type);
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
    
    
    var event_0 = new simEvents.ResultEvent(scalarValueResults_0);
    
    Util.serializeOk(
      event_0,
      CONSTANTS.STR_resultEvent_0
    );
    

};



test.serialization.EventController.prototype.T06_resultEvent_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_resultEvent_0,
      simEvents.ResultEvent
    );
    
    assertEquals("lgb.simulation.events.ResultEvent", event_0.type);
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
    
    var event_0 = new simEvents.SimStateNativeRequest(simStateNative_0);
    
    Util.serializeOk(
      event_0,
      CONSTANTS.STR_simStateNativeRequest_0
    );
    
    

    
};


test.serialization.EventController.prototype.T08_simStateNativeRequest_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_simStateNativeRequest_0,
      simEvents.SimStateNativeRequest
    );
    
    assertEquals("lgb.simulation.events.SimStateNativeRequest", event_0.type);
    ok(event_0 instanceof simEvents.SimStateNativeRequest);

    var simStateNative_0 = event_0.getPayload();
    ok(simStateNative_0 instanceof lgb.simulation.model.voNative.SimStateNative);
    

    assertEquals(17, simStateNative_0.getIntValue());
    assertEquals("step_requested", simStateNative_0.getString());

};


test.serialization.EventController.prototype.T09_simStateNativeNotify_serialize = function() {

    var simStateNativeEnum_0 = lgb.simulation.model.voNative.SimStateNative.ENUM.simStateNative_3_ready;
    var simStateNative_0 = new lgb.simulation.model.voNative.SimStateNative(simStateNativeEnum_0);
    
    var event_0 = new simEvents.SimStateNativeNotify(simStateNative_0);
    
    
    Util.serializeOk(
      event_0,
      CONSTANTS.STR_simStateNativeNotify_0
    );
    
    
};



test.serialization.EventController.prototype.T10_simStateNativeNotify_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_simStateNativeNotify_0,
      simEvents.SimStateNativeNotify
    );
    
    assertEquals("lgb.simulation.events.SimStateNativeNotify", event_0.type);
    ok(event_0 instanceof simEvents.SimStateNativeNotify);
    
    var simStateNative_0 = event_0.getPayload();
    ok(simStateNative_0 instanceof lgb.simulation.model.voNative.SimStateNative);
    
    assertEquals(10, simStateNative_0.getIntValue());
    assertEquals("ready", simStateNative_0.getString());
    
};


test.serialization.EventController.prototype.T11_xmlParsedEvent_serialize = function() {

  var Enu = lgb.simulation.model.voNative.Enu.ENUM;
    
  var scalarVariableCollection_0 = test.main.TestDataGenerator.getScalarVariableCollection_A_();
  ok(scalarVariableCollection_0 instanceof lgb.simulation.model.voManaged.ScalarVariableCollection);
  
  var scalarVariableCollection_1 = test.main.TestDataGenerator.getScalarVariableCollection_B_();
  ok(scalarVariableCollection_1 instanceof lgb.simulation.model.voManaged.ScalarVariableCollection);
  
  var scalarVariablesAll_0 = new lgb.simulation.model.voManaged.ScalarVariablesAll();
  scalarVariablesAll_0.setInput(scalarVariableCollection_0);
  scalarVariablesAll_0.setOutput(scalarVariableCollection_1);

  Util.serializeOk(
    scalarVariablesAll_0,
    CONSTANTS.STR_scalarVariablesAll_0
  );
    
  var xmlParsedInfo_0 = new lgb.simulation.model.voManaged.XMLparsedInfo(scalarVariablesAll_0);
  
  Util.serializeOk(
    xmlParsedInfo_0,
    CONSTANTS.STR_XMLparsedInfo_0
  );
    
  var event_0 = new simEvents.XMLparsedEvent(xmlParsedInfo_0);
    
  Util.serializeOk(
    event_0,
    CONSTANTS.STR_xmlParsedEvent_0
  );
  
    
};


test.serialization.EventController.prototype.T12_xmlParsedEvent_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_xmlParsedEvent_0,
      simEvents.XMLparsedEvent
    );
    
    assertEquals("lgb.simulation.events.XMLparsedEvent", event_0.type);

    var xmlParsedInfo_0 = event_0.getPayload();
    
    var scalarVariableRealList_input = xmlParsedInfo_0.getInputVariables(); 
    var scalarVariableRealList_output = xmlParsedInfo_0.getOutputVariables(); 
    
    assertEquals( 2, scalarVariableRealList_input.length);
    assertEquals( 2, scalarVariableRealList_output.length);
    
    var scalarVariableReal_0 = scalarVariableRealList_input[0];
    
    var theEnumCausality = scalarVariableReal_0.getCausalityAsEnum();
    
    assertEquals( Enu.enu_input, theEnumCausality.getIntValue());
    assertEquals( 6, scalarVariableReal_0.getCausalityAsInt());
    assertEquals( "input", scalarVariableReal_0.getCausalityAsString());
    
    assertEquals( "scalarVar name", scalarVariableReal_0.getName());
    assertEquals( 1, scalarVariableReal_0.getIdx());
   

    var theEnumVariability = scalarVariableReal_0.getVariabilityAsEnum();
   
    assertEquals( Enu.enu_continuous, theEnumVariability.getIntValue());
    assertEquals( 5, scalarVariableReal_0.getVariabilityAsInt());
    assertEquals( "continuous", scalarVariableReal_0.getVariabilityAsString());
    
    assertEquals( "The Description", scalarVariableReal_0.getDescription());
    assertEquals( "C1", scalarVariableReal_0.getUnit());
    
    var typeSpecReal_0 = scalarVariableReal_0.getTypeSpecReal();
    
    assertEquals(20.25 , typeSpecReal_0.start, 0.0);
    assertEquals(21.25 , typeSpecReal_0.nominal, 0.0);
    assertEquals(22.25 , typeSpecReal_0.min, 0.0);
    assertEquals(23.25 , typeSpecReal_0.max, 0.0);
    assertEquals("C1" , typeSpecReal_0.unit);
   
};


test.serialization.EventController.prototype.T13_scalarValueChangeRequest_serialize = function() {

    //make struct
    var struct_0 = new voNative.ScalarValueRealStruct();
    struct_0.idx = 1;
    struct_0.value = 2.0;
    
    //make Object
    var scalarValueReal_0 = new voManaged.ScalarValueReal();
    scalarValueReal_0.setStruct(struct_0);
    
  
    var serializableVector_0 = new voManaged.SerializableVector("ScalarValueReal");
    serializableVector_0.add(scalarValueReal_0);

    
    var scalarValueCollection_0 = new voManaged.ScalarValueCollection();
    
    var realList = serializableVector_0.toArray();
    scalarValueCollection_0.setRealList(realList);

    var event_0 = new simEvents.ScalarValueChangeRequest (scalarValueCollection_0);

    Util.serializeOk(
      event_0,
      CONSTANTS.STR_scalarValueChangeRequest_0
    );
    
    
};


test.serialization.EventController.prototype.T14_scalarValueChangeRequest_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarValueChangeRequest_0,
      simEvents.ScalarValueChangeRequest
    );
    
    assertEquals("lgb.simulation.events.ScalarValueChangeRequest", event_0.type);
    
    var scalarValueCollection_0 = event_0.getPayload();
    assertEquals("ScalarValueCollection", scalarValueCollection_0.getClassName());
    
    var realList = scalarValueCollection_0.getRealList();
    
    var scalarValueReal_0 = realList[0];
    
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    
};



test.serialization.EventController.prototype.T15_sessionControlClientRequest_serialize = function() {


    var sessionControlAction_0 = new voManaged.SessionControlAction(voManaged.SessionControlAction.ENUM.attachToSession);
    var sessionControlModel_0 = new voManaged.SessionControlModel(sessionControlAction_0, "SESS1342");
    
    var event_0 = new simEvents.SessionControlClientRequest( sessionControlModel_0);

    Util.serializeOk(
      event_0,
      CONSTANTS.STR_sessionControlClientRequest_0
    );
    
    
    
};

test.serialization.EventController.prototype.T16_sessionControlClientRequest_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_sessionControlClientRequest_0,
      simEvents.SessionControlClientRequest
    );
    
    assertEquals("lgb.simulation.events.SessionControlClientRequest", event_0.type);
    
    var sessionControlModel_0 = event_0.getPayload();
    assertEquals("SessionControlModel", sessionControlModel_0.getClassName());

    assertEquals("SESS1342", sessionControlModel_0.getValue());
    var sessionControlAction_0 = sessionControlModel_0.getAction();
    assertEquals(voManaged.SessionControlAction.ENUM.attachToSession, sessionControlAction_0.getIntValue());

};


test.serialization.EventController.prototype.T17_initialStateRequest_serialize = function() {

    var scalarValueReal_0 = new voManaged.ScalarValueReal(1, 2.0);
    var scalarValueReal_1 = new voManaged.ScalarValueReal(2, 3.53);
    
    var realList_0 = [scalarValueReal_0, scalarValueReal_1];
    
    var scalarValueCollection_0 = new voManaged.ScalarValueCollection(realList_0);
    var event_0 = new lgb.simulation.events.InitialStateRequest(scalarValueCollection_0);
    
    Util.serializeOk(
      event_0,
      CONSTANTS.STR_initialStateRequest_0
    );
    
    return;
};


test.serialization.EventController.prototype.T18_initialStateRequest_deserialize = function() {

    var event_0 = Util.deserializeOk(
      CONSTANTS.STR_initialStateRequest_0,
      simEvents.InitialStateRequest
    );
    
    assertEquals("lgb.simulation.events.InitialStateRequest", event_0.type);
    
    var realList_0 = event_0.getPayload();
    
    var scalarValueReal_0 = realList_0.getRealList()[0];
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue());
           
    var scalarValueReal_1 = realList_0.getRealList()[1];
    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(3.53, scalarValueReal_1.getValue());
          
    
};






