/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.serialization.VoManagedController');

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
goog.require('lgb.simulation.model.voNative.Enu');

goog.require('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.model.voManaged.ScalarValueResults');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.ScalarVariableReal');
goog.require('lgb.simulation.model.voManaged.ScalarVariablesAll');
goog.require('lgb.simulation.model.voManaged.XMLparsedInfo');
goog.require('lgb.simulation.model.voManaged.InitialState');

goog.require('test.main.TestDataGenerator');
goog.require('lgb.simulation.model.voManaged.SerializableVector');
goog.require('lgb.simulation.model.voManaged.SessionControlAction');
goog.require('lgb.simulation.model.voManaged.SessionControlModel');
goog.require('lgb.simulation.model.voManaged.StringPrimitive');
 
/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.serialization.VoManagedController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  this.jsonController_ = lgb.simulation.controller.JsonController.getInstance();
  
  var delegate = jQuery.proxy(this.runAll, this);
  jQuery(document).ready(delegate);
  
};
goog.inherits(test.serialization.VoManagedController, lgb.core.BaseController);



test.serialization.VoManagedController.start = function() {
    
  lgb.init();
  test.serialization.VoManagedController.instance = new test.serialization.VoManagedController();
  
    
};


test.serialization.VoManagedController.prototype.runAll = function() {
  
    module( "VoManaged" );
    

    
    test("T01 ScalarValueReal Serialize", 2, this.T01_scalarValueReal_serialize);
    test("T02 ScalarValueReal Deserialize", 6, this.T02_scalarValueReal_deserialize);
    
    test("T03 ScalarVariableReal Serialize", 2, this.T03_scalarVariableReal_serialize);
    test("T04 ScalarVariableReal Deserialize", 18, this.T04_scalarVariableReal_deserialize);
    
    test("T05 ScalarValueCollection Serialize", 1, this.T05_scalarValueCollection_serialize);
    test("T06 ScalarValueCollection Deserialize", 6, this.T06_scalarValueCollection_deserialize);
    
    test("T07 SerializableVector A Serialize", 1, this.T07_serializableVectorA_serialize);
    test("T08 SerializableVector A Deserialize", 6, this.T08_serializableVectorA_deserialize);
    
    test("T09 ScalarValueResults Serialize", 7, this.T09_scalarValueResults_serialize);
    test("T10 ScalarValueResults Deserialize", 12, this.T10_scalarValueResults_deserialize);
                                                  
    test("T11 ScalarVariableCollection Serialize", 2, this.T11_scalarVariableCollection_serialize);
    test("T12 ScalarVariableCollection Deserialize", 63, this.T12_scalarVariableCollection_deserialize);

    test("T13 ScalarVariablesAll Serialize", 3, this.T13_scalarVariablesAll_serialize);
    test("T14 ScalarVariablesAll Deserialize", 1, this.T14_scalarVariablesAll_deserialize);
    
    test("T15 SessionControlAction Serialize", 2, this.T15_sessionControlAction_serialize);
    test("T16 SessionControlAction Deserialize", 6, this.T16_sessionControlAction_deserialize);
    
    test("T17 SessionControlModel Serialize", 2, this.T17_sessionControlModel_serialize);
    test("T18 SessionControlModel Deserialize", 3, this.T18_sessionControlModel_deserialize);
    
    test("T19 XMLparsedInfo Serialize", 4, this.T19_xmlParsedInfo_serialize);
    test("T20 XMLparsedInfo Deserialize", 18, this.T20_xmlParsedInfo_deserialize);
    
    test("T21 SerializableVector B Serialize", 2, this.T21_serializableVectorB_serialize);
    test("T22 SerializableVector B Deserialize", 5, this.T22_serializableVectorB_deserialize);

    test("T23 InitialState Serialize", 3, this.T23_initialState_serialize);
    test("T24 InitialState Deserialize", 16, this.T24_initialState_deserialize);
    

};




test.serialization.VoManagedController.prototype.T01_scalarValueReal_serialize = function() {
  
    var scalarValueReal_0 = new 
      voManaged.ScalarValueReal(1,2.0);

    Util.serializeOk(
      scalarValueReal_0,
      CONSTANTS.STR_scalarValueReal_0
    );
    
    
    var scalarValueReal_1 = new 
      voManaged.ScalarValueReal(2, 14.2);


    Util.serializeOk(
      scalarValueReal_1,
      CONSTANTS.STR_scalarValueReal_1
    );
    
    
    
};



test.serialization.VoManagedController.prototype.T02_scalarValueReal_deserialize = function() {
 
    var scalarValueReal_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarValueReal_0,
      voManaged.ScalarValueReal
    );
    
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    
    
    var scalarValueReal_1 = Util.deserializeOk(
      CONSTANTS.STR_scalarValueReal_1,
      voManaged.ScalarValueReal
    );
    
    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(14.2, scalarValueReal_1.getValue(), 0.0);
    
};



test.serialization.VoManagedController.prototype.T03_scalarVariableReal_serialize = function() {
  
  
    //make TypeSpecReal
    var typeSpecReal_0 = new lgb.simulation.model.voNative.TypeSpecReal();
    typeSpecReal_0.start = 20.25;
    typeSpecReal_0.nominal = 21.25;
    typeSpecReal_0.min = 22.25;
    typeSpecReal_0.max = 23.25;
    typeSpecReal_0.unit = "C";
    
    typeSpecReal_0.startValueStatus = 1;
    typeSpecReal_0.nominalValueStatus = 1;
    typeSpecReal_0.minValueStatus = 1;
    typeSpecReal_0.maxValueStatus = 1;
    typeSpecReal_0.unitValueStatus = 1;
    
    //make ScalarVariableReal
    var scalarVariableReal_0 = new voManaged.ScalarVariableReal(typeSpecReal_0);
    ok(scalarVariableReal_0 instanceof voManaged.ScalarVariableReal);
    
    scalarVariableReal_0.setName("scalarVar name");
    scalarVariableReal_0.setIdx(1);
    scalarVariableReal_0.setCausality(Enu.enu_input);
    scalarVariableReal_0.setVariability(Enu.enu_continuous);
    scalarVariableReal_0.setDescription("The Description");
    scalarVariableReal_0.setValueReference(125420);
    
    Util.serializeOk (
      scalarVariableReal_0,
      CONSTANTS.STR_scalarVariableReal_0
    );
    
};




test.serialization.VoManagedController.prototype.T04_scalarVariableReal_deserialize= function() {
  
    
    var scalarVariableReal_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarVariableReal_0,
      voManaged.ScalarVariableReal
    );
    
    
    assertEquals(125420, scalarVariableReal_0.getValueReference());
    assertEquals(1, scalarVariableReal_0.getIdx());
    assertEquals("scalarVar name", scalarVariableReal_0.getName());
    
    //Causality
    assertEquals(6, scalarVariableReal_0.getCausalityAsInt());
    var causalityEnum = scalarVariableReal_0.getCausalityAsEnum();
    var causalityString = causalityEnum.toString();
    
    assertEquals("input", causalityString);
    assertEquals(6, causalityEnum.getIntValue());
    assertEquals(Enu.enu_input, causalityEnum.getIntValue());
    
    //Variability
    assertEquals(5, scalarVariableReal_0.getVariabilityAsInt());
    var variabilityEnum = scalarVariableReal_0.getVariabilityAsEnum();
    var variabilityString = variabilityEnum.toString();
    
    assertEquals("continuous", variabilityString);
    assertEquals(5, variabilityEnum.getIntValue());
    assertEquals(Enu.enu_continuous, variabilityEnum.getIntValue());
    
    assertEquals("The Description", scalarVariableReal_0.getDescription());
    
    var typeSpecReal_0 = scalarVariableReal_0.getTypeSpecReal();

    assertEquals(20.25, typeSpecReal_0.start, 0.0);
    assertEquals(21.25, typeSpecReal_0.nominal, 0.0);
    assertEquals(22.25, typeSpecReal_0.min, 0.0);
    assertEquals(23.25, typeSpecReal_0.max, 0.0);
    assertEquals("C", typeSpecReal_0.unit);
    
};






test.serialization.VoManagedController.prototype.T05_scalarValueCollection_serialize = function() {

  var scalarValueReal_0 = new voManaged.ScalarValueReal(1, 2.0);
  var scalarValueReal_1 = new voManaged.ScalarValueReal(2, 3.53);

  var realList_0 = [scalarValueReal_0, scalarValueReal_1];

  var scalarValueCollection_0 = new voManaged.ScalarValueCollection(realList_0);


  Util.serializeOk(
    scalarValueCollection_0,
    CONSTANTS.STR_scalarValueCollection_0
  );
    
}; 




test.serialization.VoManagedController.prototype.T06_scalarValueCollection_deserialize = function() {
  
  
    var scalarValueCollection_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarValueCollection_0,
      voManaged.ScalarValueCollection
    );
    
    equal(scalarValueCollection_0.realList_.length, 2);
    
    var scalarValueReal_0  = scalarValueCollection_0.realList_[0];
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    
    var scalarValueReal_1  = scalarValueCollection_0.realList_[1];
    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(3.53, scalarValueReal_1.getValue(), 0.0);
    
};


test.serialization.VoManagedController.prototype.T07_serializableVectorA_serialize = function() {

    //make real 1
    var scalarValueRealStruct_0 = new lgb.simulation.model.voNative.ScalarValueRealStruct();
    scalarValueRealStruct_0.idx = 1;
    scalarValueRealStruct_0.value = 2.0;
    var scalarValueReal_0 = new voManaged.ScalarValueReal();
    scalarValueReal_0.setStruct(scalarValueRealStruct_0);
    
    
    //make real 2
    var scalarValueRealStruct_1 = new lgb.simulation.model.voNative.ScalarValueRealStruct();
    scalarValueRealStruct_1.idx = 2;
    scalarValueRealStruct_1.value = 3.53;
    var scalarValueReal_1 = new voManaged.ScalarValueReal(scalarValueRealStruct_1);
    scalarValueReal_1.setStruct(scalarValueRealStruct_1);
    
    
    var itemArray = [scalarValueRealStruct_0, scalarValueRealStruct_1];    
    
    //make real list
    var serializableVector_0 = new voManaged.SerializableVector();
    serializableVector_0.add(scalarValueReal_0);
    serializableVector_0.add(scalarValueReal_1);


    Util.serializeOk(
      serializableVector_0,
      CONSTANTS.STR_serializableVector_0
    );
    
      
   
};


test.serialization.VoManagedController.prototype.T08_serializableVectorA_deserialize = function() {
  
    var serializableVector_0 = Util.deserializeOk(
      CONSTANTS.STR_serializableVector_0,
      voManaged.SerializableVector
    );
    
    var itemTypeString  = serializableVector_0.getItemTypeString();
    assertEquals("ScalarValueReal", itemTypeString);
    
    var scalarValueReal_0 = serializableVector_0.get(0);
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    
    var scalarValueReal_1 = serializableVector_0.get(1);
    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(3.53, scalarValueReal_1.getValue(), 0.0);
    

};




test.serialization.VoManagedController.prototype.T09_scalarValueResults_serialize = function() {


    var scalarValueReal_0 = new voManaged.ScalarValueReal(1, 2.0);
    ok(scalarValueReal_0 instanceof voManaged.ScalarValueReal);
    
    var scalarValueReal_1 = new voManaged.ScalarValueReal(2, 3.53);
    ok(scalarValueReal_1 instanceof voManaged.ScalarValueReal);
    
    
    var realList_0 = [scalarValueReal_0, scalarValueReal_1];
    var scalarValueCollection_0 = new voManaged.ScalarValueCollection(realList_0);
    ok(scalarValueCollection_0 instanceof voManaged.ScalarValueCollection);
    
    
    var scalarValueReal_2 = new voManaged.ScalarValueReal(3, 258.2);
    ok(scalarValueReal_2 instanceof voManaged.ScalarValueReal);
    
    var scalarValueReal_3 = new voManaged.ScalarValueReal(4, 78.0);
    ok(scalarValueReal_3 instanceof voManaged.ScalarValueReal);
    
    
    var realList_1 = [scalarValueReal_2, scalarValueReal_3];
    var scalarValueCollection_1 = new voManaged.ScalarValueCollection(realList_1);
    ok(scalarValueCollection_1 instanceof voManaged.ScalarValueCollection);
    
    
    var scalarValueResults = new voManaged.ScalarValueResults();
    scalarValueResults.time_ = 2800.1;
    scalarValueResults.input = scalarValueCollection_0;
    scalarValueResults.output = scalarValueCollection_1;
    
    
    Util.serializeOk(
      scalarValueResults,
      CONSTANTS.STR_scalarValueResults_0
    );
    


};



test.serialization.VoManagedController.prototype.T10_scalarValueResults_deserialize= function() {
  
    var scalarValueResults_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarValueResults_0,
      voManaged.ScalarValueResults
    );
    
    assertEquals(2800.1, scalarValueResults_0.getTime(), 0.0);
    
    var scalarValueCollection_0 = scalarValueResults_0.getInput();
    ok(scalarValueCollection_0 instanceof voManaged.ScalarValueCollection);
    var realList_0 = scalarValueCollection_0.getRealList();
    
    var scalarValueReal_0 = realList_0[0];
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    
    var scalarValueReal_1 = realList_0[1];
    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(3.530, scalarValueReal_1.getValue(), 0.0);
    
    var scalarValueCollection_1 = scalarValueResults_0.getOutput();
    ok(scalarValueCollection_1 instanceof voManaged.ScalarValueCollection);
    var realList_1 = scalarValueCollection_1.getRealList();
    
    var scalarValueReal_2 = realList_1[0];
    assertEquals(3, scalarValueReal_2.getIdx());
    assertEquals(258.2, scalarValueReal_2.getValue(), 0.0);
    
    var scalarValueReal_3 = realList_1[1];
    assertEquals(4, scalarValueReal_3.getIdx());
    assertEquals(78.0, scalarValueReal_3.getValue(), 0.0);
    
 
};



test.serialization.VoManagedController.prototype.T11_scalarVariableCollection_serialize= function() {
  
    var scalarVariableCollection_0 = test.main.TestDataGenerator.getScalarVariableCollection_A_();
  
    Util.serializeOk(
      scalarVariableCollection_0,
      CONSTANTS.STR_scalarVariableCollection_0
    );
    

    var scalarVariableCollection_1 = test.main.TestDataGenerator.getScalarVariableCollection_B_();
  
    Util.serializeOk(
      scalarVariableCollection_1,
      CONSTANTS.STR_scalarVariableCollection_1
    );
        
        
};


test.serialization.VoManagedController.prototype.T12_scalarVariableCollection_deserialize= function() {
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
    
    var scalarVariableCollection_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarVariableCollection_0,
      voManaged.ScalarVariableCollection
    );
    
    var scalarVariableReal_0 = scalarVariableCollection_0.getRealVarList()[0];
    ok(scalarVariableReal_0 instanceof voManaged.ScalarVariableReal);
    
    assertEquals(125420, scalarVariableReal_0.getValueReference());
    assertEquals(1, scalarVariableReal_0.getIdx());
    assertEquals("scalarVar name", scalarVariableReal_0.getName());
    
    //Causality
    var theCausalityEnum_0 = scalarVariableReal_0.getCausalityAsEnum();
    assertEquals(6, scalarVariableReal_0.getCausalityAsInt());
    assertEquals(Enu.enu_input, theCausalityEnum_0.getIntValue());
    assertEquals("input", theCausalityEnum_0.toString());
    
    //Variability
    var theVariabilityEnum_0 = scalarVariableReal_0.getVariabilityAsEnum();
    assertEquals(5, scalarVariableReal_0.getVariabilityAsInt());
    assertEquals(Enu.enu_continuous, theVariabilityEnum_0.getIntValue());
    assertEquals("continuous", theVariabilityEnum_0.toString());
    
    assertEquals("The Description", scalarVariableReal_0.getDescription());
    
    var typeSpecReal_0 = scalarVariableReal_0.getTypeSpecReal();
    
    assertEquals(20.25, typeSpecReal_0.start, 0.0);
    assertEquals(21.25, typeSpecReal_0.nominal, 0.0);
    assertEquals(22.25, typeSpecReal_0.min, 0.0);
    assertEquals(23.25, typeSpecReal_0.max, 0.0);
    assertEquals("C1", typeSpecReal_0.unit);
    
    
    var scalarVariableReal_1 = scalarVariableCollection_0.getRealVarList()[1];
    
    assertEquals(125420, scalarVariableReal_1.getValueReference());
    assertEquals(1, scalarVariableReal_1.getIdx());
    assertEquals("scalarVar name", scalarVariableReal_1.getName());
    
    //Causality
    var theCausalityEnum_1 = scalarVariableReal_1.getCausalityAsEnum();
    assertEquals(6, scalarVariableReal_1.getCausalityAsInt());
    assertEquals(Enu.enu_input, theCausalityEnum_1.getIntValue());
    assertEquals("input", theCausalityEnum_1.toString());
        
    //Variability
    var theVariabilityEnum_1 = scalarVariableReal_1.getVariabilityAsEnum();
    assertEquals(4, scalarVariableReal_1.getVariabilityAsInt());
    assertEquals(Enu.enu_discrete, theVariabilityEnum_1.getIntValue());
    assertEquals("discrete", theVariabilityEnum_1.toString());
    
    assertEquals("The Description", scalarVariableReal_1.getDescription());
    
    var typeSpecReal_1 = scalarVariableReal_1.getTypeSpecReal();
    
    assertEquals(2.25, typeSpecReal_1.start, 0.0);
    assertEquals(2.26, typeSpecReal_1.nominal, 0.0);
    assertEquals(2.27, typeSpecReal_1.min, 0.0);
    assertEquals(2.28, typeSpecReal_1.max, 0.0);
    assertEquals("C2", typeSpecReal_1.unit);
    
    
    var scalarVariableCollection_1 = Util.deserializeOk(
      CONSTANTS.STR_scalarVariableCollection_1,
      voManaged.ScalarVariableCollection
    );


    var scalarVariableReal_2 = scalarVariableCollection_1.getRealVarList()[0];
    assertEquals(7547, scalarVariableReal_2.getValueReference());
    
    assertEquals(0, scalarVariableReal_2.getIdx());
    assertEquals("ES-23", scalarVariableReal_2.getName());
    
    //Causality
    var theCausalityEnum_2 = scalarVariableReal_2.getCausalityAsEnum();
    assertEquals(7, scalarVariableReal_2.getCausalityAsInt());
    assertEquals(Enu.enu_output, theCausalityEnum_2.getIntValue());
    assertEquals("output", theCausalityEnum_2.toString());
        
    //Variability
    var theVariabilityEnum_2 = scalarVariableReal_2.getVariabilityAsEnum();
    assertEquals(5, scalarVariableReal_2.getVariabilityAsInt());
    assertEquals(Enu.enu_continuous, theVariabilityEnum_2.getIntValue());
    assertEquals("continuous", theVariabilityEnum_2.toString());
    
    assertEquals("This is the pressure in the duct measured in Pa", scalarVariableReal_2.getDescription());
    
    var typeSpecReal_2 = scalarVariableReal_2.getTypeSpecReal();
    
    assertEquals(1.0, typeSpecReal_2.start, 0.0);
    assertEquals(1000.0, typeSpecReal_2.nominal, 0.0);
    assertEquals(0.0, typeSpecReal_2.min, 0.0);
    assertEquals(5400.01, typeSpecReal_2.max, 0.0);
    assertEquals("Pa", typeSpecReal_2.unit);
    
    var scalarVariableReal_3 = scalarVariableCollection_1.getRealVarList()[1];
    assertEquals(55, scalarVariableReal_3.getValueReference());
    
    assertEquals(1, scalarVariableReal_3.getIdx());
    assertEquals("PA57-FA", scalarVariableReal_3.getName());
    
    
    //Causality
    var theCausalityEnum_3 = scalarVariableReal_3.getCausalityAsEnum();
    assertEquals(6, scalarVariableReal_3.getCausalityAsInt());
    assertEquals(Enu.enu_input, theCausalityEnum_3.getIntValue());
    assertEquals("input", theCausalityEnum_3.toString());
        
    //Variability
    var theVariabilityEnum_3 = scalarVariableReal_3.getVariabilityAsEnum();
    assertEquals(3, scalarVariableReal_3.getVariabilityAsInt());
    assertEquals(Enu.enu_parameter, theVariabilityEnum_3.getIntValue());
    assertEquals("parameter", theVariabilityEnum_3.toString());
    
    assertEquals("Pressure in Duct per meter", scalarVariableReal_3.getDescription());
    
    var typeSpecReal_3 = scalarVariableReal_3.getTypeSpecReal();
    
    assertEquals(12.0, typeSpecReal_3.start, 0.0);
    assertEquals(50.0, typeSpecReal_3.nominal, 0.0);
    assertEquals(2.0, typeSpecReal_3.min, 0.0);
    assertEquals(500000.0, typeSpecReal_3.max, 0.0);
    assertEquals("Pa per meter", typeSpecReal_3.unit);
  
};






test.serialization.VoManagedController.prototype.T13_scalarVariablesAll_serialize= function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
      
    var scalarVariableCollection_0 = test.main.TestDataGenerator.getScalarVariableCollection_A_();
    ok(scalarVariableCollection_0 instanceof voManaged.ScalarVariableCollection);
    
    var scalarVariableCollection_1 = test.main.TestDataGenerator.getScalarVariableCollection_B_();
    ok(scalarVariableCollection_1 instanceof voManaged.ScalarVariableCollection);


    var scalarVariablesAll_0 = new voManaged.ScalarVariablesAll();
    scalarVariablesAll_0.setInput(scalarVariableCollection_0);
    scalarVariablesAll_0.setOutput(scalarVariableCollection_1);

    Util.serializeOk(
      scalarVariablesAll_0,
      CONSTANTS.STR_scalarVariablesAll_0
    );

};




test.serialization.VoManagedController.prototype.T14_scalarVariablesAll_deserialize= function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
    
    var scalarVariablesAll_0 = Util.deserializeOk(
      CONSTANTS.STR_scalarVariablesAll_0,
      voManaged.ScalarVariablesAll
    );

};






test.serialization.VoManagedController.prototype.T15_sessionControlAction_serialize = function() {
  

    var sessionControlAction_0 = new SessionControlAction(
      SessionControlAction.ENUM.attachToSession
    );
    
    Util.serializeOk(
      sessionControlAction_0,
      CONSTANTS.STR_sessionControlAction_0
    );
    
    
    var sessionControlAction_1 = new SessionControlAction(
      SessionControlAction.ENUM.getInfo
    );

    Util.serializeOk(
      sessionControlAction_1,
      CONSTANTS.STR_sessionControlAction_1
    );
        
  
};

test.serialization.VoManagedController.prototype.T16_sessionControlAction_deserialize = function() {
  
    var sessionControlAction_0 = Util.deserializeOk(
      CONSTANTS.STR_sessionControlAction_0,
      SessionControlAction
    );
    
    assertEquals(SessionControlAction.ENUM.attachToSession , sessionControlAction_0.getIntValue());
    assertEquals(0 , sessionControlAction_0.getIntValue());
    
    
    var sessionControlAction_1 = Util.deserializeOk(
      CONSTANTS.STR_sessionControlAction_1,
      SessionControlAction
    );
    
    assertEquals(SessionControlAction.ENUM.getInfo , sessionControlAction_1.getIntValue());
    assertEquals(1 , sessionControlAction_1.getIntValue());
    
};


test.serialization.VoManagedController.prototype.T17_sessionControlModel_serialize = function() {
  
    var sessionControlAction_0 = new SessionControlAction(
      SessionControlAction.ENUM.attachToSession
    );
    
    var sessionControlModel_0 = new voManaged.SessionControlModel(sessionControlAction_0, "SESS1342");
    
    Util.serializeOk(
      sessionControlModel_0,
      CONSTANTS.STR_sessionControlModel_0
    );
    
    var sessionControlAction_1 = new SessionControlAction(
      SessionControlAction.ENUM.getInfo
    );
    
    var sessionControlModel_1 = new voManaged.SessionControlModel(sessionControlAction_1);
  
    Util.serializeOk(
      sessionControlModel_1,
      CONSTANTS.STR_sessionControlModel_1
    );
  
};


test.serialization.VoManagedController.prototype.T18_sessionControlModel_deserialize = function() {
  
     var sessionControlModel_0 = Util.deserializeOk(
      CONSTANTS.STR_sessionControlModel_0,
      voManaged.SessionControlModel
    );
    
    var sessionControlAction_0 = sessionControlModel_0.getAction();
    assertEquals(SessionControlAction.ENUM.attachToSession, sessionControlAction_0.getIntValue());
    assertEquals("SESS1342" , sessionControlModel_0.getValue());
    
};

test.serialization.VoManagedController.prototype.T19_xmlParsedInfo_serialize = function() {
  

  var scalarVariableCollection_0 = test.main.TestDataGenerator.getScalarVariableCollection_A_();
  ok(scalarVariableCollection_0 instanceof voManaged.ScalarVariableCollection);
  
  var scalarVariableCollection_1 = test.main.TestDataGenerator.getScalarVariableCollection_B_();
  ok(scalarVariableCollection_1 instanceof voManaged.ScalarVariableCollection);
  
  var scalarVariablesAll_0 = new voManaged.ScalarVariablesAll();
  scalarVariablesAll_0.setInput(scalarVariableCollection_0);
  scalarVariablesAll_0.setOutput(scalarVariableCollection_1);

  Util.serializeOk(
    scalarVariablesAll_0,
    CONSTANTS.STR_scalarVariablesAll_0
  );
    
  var xmlParsedInfo_0 = new voManaged.XMLparsedInfo(scalarVariablesAll_0);
  
  Util.serializeOk(
    xmlParsedInfo_0,
    CONSTANTS.STR_XMLparsedInfo_0
  );

};


test.serialization.VoManagedController.prototype.T20_xmlParsedInfo_deserialize = function() {

    var xmlParsedInfo_0 = Util.deserializeOk(
      CONSTANTS.STR_XMLparsedInfo_0,
      voManaged.XMLparsedInfo
    );
    
    var scalarVariableRealList_input = xmlParsedInfo_0.getInputVariables(); 
    var scalarVariableRealList_output = xmlParsedInfo_0.getOutputVariables(); 
    
    assertEquals( 2, scalarVariableRealList_input.length);
    assertEquals( 2, scalarVariableRealList_output.length);
    
    var scalarVariableReal_0 = scalarVariableRealList_input[0];
    
    var theEnum_0 = scalarVariableReal_0.getCausalityAsEnum();
    
    assertEquals( Enu.enu_input, theEnum_0.getIntValue());
    assertEquals( 6, scalarVariableReal_0.getCausalityAsInt());
    assertEquals( "input", scalarVariableReal_0.getCausalityAsString());
    
    assertEquals( "scalarVar name", scalarVariableReal_0.getName());
    assertEquals( 1, scalarVariableReal_0.getIdx());
    
    
    var theEnum_1 = scalarVariableReal_0.getVariabilityAsEnum();
    
    assertEquals( Enu.enu_continuous, theEnum_1.getIntValue());
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
    
    return;
};



test.serialization.VoManagedController.prototype.T21_serializableVectorB_serialize = function() {
  
  
  var ary = [
    new lgb.simulation.model.voManaged.StringPrimitive ('y_ZN[1]'), 
    new lgb.simulation.model.voManaged.StringPrimitive ('y_ZN[5]')
  ];
  
  
  var serializableVector_0 = new lgb.simulation.model.voManaged.SerializableVector('StringPrimitive', ary);

  ok(serializableVector_0 instanceof voManaged.SerializableVector);
  
  Util.serializeOk(
    serializableVector_0,
    CONSTANTS.STR_serializableVector_1
  );
    
  return;
  
};



test.serialization.VoManagedController.prototype.T22_serializableVectorB_deserialize = function() {
  
  var serializableVector_0 = Util.deserializeOk(
    CONSTANTS.STR_serializableVector_1,
    voManaged.SerializableVector
  );
    
  var stringPrimitive_0 = serializableVector_0.get(0);
  ok(stringPrimitive_0 instanceof voManaged.StringPrimitive);
  
  var str_0 = stringPrimitive_0.getValue();
  assertEquals("y_ZN[1]" , str_0);
  
  var stringPrimitive_1 = serializableVector_0.get(1);
  ok(stringPrimitive_1 instanceof voManaged.StringPrimitive);
  
  var str_1 = stringPrimitive_1.getValue();
  assertEquals("y_ZN[5]" , str_1);
  

    
};


test.serialization.VoManagedController.prototype.T23_initialState_serialize = function() {
  
  var scalarValueReal_0 = new voManaged.ScalarValueReal(1, 2.0);
  ok(scalarValueReal_0 instanceof voManaged.ScalarValueReal);
  
  var scalarValueReal_1 = new voManaged.ScalarValueReal(2, 3.53);
  ok(scalarValueReal_1 instanceof voManaged.ScalarValueReal);
  
  
  var realList_0 = [scalarValueReal_0, scalarValueReal_1];
  var scalarValueCollection_0 = new voManaged.ScalarValueCollection(realList_0);
  
  
  var defaultExperimentStruct_0 = new lgb.simulation.model.voNative.DefaultExperimentStruct(123.03, 145.03, 10.0);
  var configStruct_0 = new lgb.simulation.model.voNative.ConfigStruct(defaultExperimentStruct_0, 1);
  
  var outputVarList = [
    new lgb.simulation.model.voManaged.StringPrimitive ('y_ZN[1]'), 
    new lgb.simulation.model.voManaged.StringPrimitive ('y_ZN[5]')
  ];
  
  var serializableVector_0 = new lgb.simulation.model.voManaged.SerializableVector('StringPrimitive', outputVarList);
  
  var initialState_0 = new lgb.simulation.model.voManaged.InitialState
  ( scalarValueCollection_0,
    configStruct_0,
    outputVarList
  );
  
  
  Util.serializeOk(
    initialState_0,
    CONSTANTS.STR_InitialState_0
  );
  
  return;

};


test.serialization.VoManagedController.prototype.T24_initialState_deserialize = function() {
  
  var initialState_0 = Util.deserializeOk(
    CONSTANTS.STR_InitialState_0,
    voManaged.InitialState
  );
  
  var parameters_0 = initialState_0.getParameters();
  var configStruct_0 = initialState_0.getConfigStruct();
  var outputVarList_0 = initialState_0.getOutputVarList();
  
  var scalarValueReal_0 = parameters_0.getRealList()[0];
  ok(scalarValueReal_0 instanceof voManaged.ScalarValueReal);
  
  assertEquals(1, scalarValueReal_0.getIdx());
  assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
  
  var scalarValueReal_1 = parameters_0.getRealList()[1];
  ok(scalarValueReal_1 instanceof voManaged.ScalarValueReal);
  
  assertEquals(2, scalarValueReal_1.getIdx());
  assertEquals(3.53, scalarValueReal_1.getValue(), 0.0);
    
  var defaultExperimentStruct_0 = configStruct_0.defaultExperimentStruct;
  ok(defaultExperimentStruct_0 instanceof voNative.DefaultExperimentStruct);
  
  assertEquals(1.0, configStruct_0.stepDelta, 0.0);
 
  assertEquals(123.03, defaultExperimentStruct_0.startTime, 0.0);
  assertEquals(145.03, defaultExperimentStruct_0.stopTime, 0.0);
  assertEquals(10.0, defaultExperimentStruct_0.tolerance, 0.0);
    
  var stringPrimitive_0 = outputVarList_0[0];
  ok(stringPrimitive_0 instanceof voManaged.StringPrimitive);
  
  var str_0 = stringPrimitive_0.getValue();
  assertEquals("y_ZN[1]" , str_0);
  
  var stringPrimitive_1 = outputVarList_0[1];
  ok(stringPrimitive_1 instanceof voManaged.StringPrimitive);
  
  var str_1 = stringPrimitive_1.getValue();
  assertEquals("y_ZN[5]" , str_1);

  return;
 
};












