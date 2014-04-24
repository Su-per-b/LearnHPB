/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('test.serialization.VoManagedController');

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
goog.require('lgb.simulation.model.voNative.Enu');

goog.require('lgb.simulation.controller.JsonController');

goog.require('lgb.simulation.model.voManaged.ScalarValueResults');
goog.require('lgb.simulation.model.voManaged.ScalarValueReal');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.ScalarVariableReal');
goog.require('lgb.simulation.model.voManaged.ScalarVariablesAll');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
test.serialization.VoManagedController = function() {

  lgb.core.BaseController.call(this);
  
  lgb.globalEventBus = new lgb.core.EventBus();

  this.jsonController_ = new lgb.simulation.controller.JsonController();
  
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
    
    test("ScalarValueReal Serialize", 2, this.scalarValueReal_serialize);
    test("ScalarValueReal Deserialize", 6, this.scalarValueReal_deserialize);
   
    test("ScalarValueCollection Serialize", 1, this.scalarValueCollection_serialize);
    test("ScalarValueCollection Deserialize", 6, this.scalarValueCollection_deserialize);
    
    test("ScalarValueResults Serialize", 7, this.scalarValueResults_serialize);
    test("ScalarValueResults Deserialize", 12, this.scalarValueResults_deserialize);

    test("ScalarVariableReal Serialize", 2, this.scalarVariableReal_serialize);
    test("ScalarVariableReal Deserialize", 18, this.scalarVariableReal_deserialize);

    test("ScalarVariableReal Serialize", 2, this.scalarVariableReal_serialize);
    test("ScalarVariableReal Deserialize", 18, this.scalarVariableReal_deserialize);

    test("ScalarVariableCollection Serialize", 2, this.scalarVariableCollection_serialize);
    test("ScalarVariableCollection Deserialize", 63, this.scalarVariableCollection_deserialize);

    test("ScalarVariablesAll Serialize", 3, this.scalarVariablesAll_serialize);
    test("ScalarVariablesAll Deserialize", 1, this.scalarVariablesAll_deserialize);
    
    
    
};




test.serialization.VoManagedController.prototype.scalarValueReal_serialize = function() {
  
    var scalarValueReal_0 = new 
      lgb.simulation.model.voManaged.ScalarValueReal(1,2.0);

    serializeOk(
      scalarValueReal_0,
      CONST.STR_scalarValueReal_0
    );
    
    
    var scalarValueReal_1 = new 
      lgb.simulation.model.voManaged.ScalarValueReal(2, 14.2);


    serializeOk(
      scalarValueReal_1,
      CONST.STR_scalarValueReal_1
    );
    

};



test.serialization.VoManagedController.prototype.scalarValueReal_deserialize = function() {
 
    var scalarValueReal_0 = deserializeOk(
      CONST.STR_scalarValueReal_0,
      voManaged.ScalarValueReal
    );
    
    assertEquals(1, scalarValueReal_0.getIdx());
    assertEquals(2.0, scalarValueReal_0.getValue(), 0.0);
    

    var scalarValueReal_1 = deserializeOk(
      CONST.STR_scalarValueReal_1,
      voManaged.ScalarValueReal
    );
    

    assertEquals(2, scalarValueReal_1.getIdx());
    assertEquals(14.2, scalarValueReal_1.getValue(), 0.0);
    
};




test.serialization.VoManagedController.prototype.scalarValueCollection_serialize = function() {

  var scalarValueReal_0 = new lgb.simulation.model.voManaged.ScalarValueReal(1, 2.0);
  var scalarValueReal_1 = new lgb.simulation.model.voManaged.ScalarValueReal(2, 3.53);

  var realList_0 = [scalarValueReal_0, scalarValueReal_1];

  var scalarValueCollection_0 = new lgb.simulation.model.voManaged.ScalarValueCollection(realList_0);


  serializeOk(
    scalarValueCollection_0,
    CONST.STR_scalarValueCollection_0
  );
    

}; 




test.serialization.VoManagedController.prototype.scalarValueCollection_deserialize = function() {
  
  
    var scalarValueCollection_0 = deserializeOk(
      CONST.STR_scalarValueCollection_0,
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





test.serialization.VoManagedController.prototype.scalarValueResults_serialize = function() {


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
    
    
    var scalarValueResults = new lgb.simulation.model.voManaged.ScalarValueResults();
    scalarValueResults.time_ = 2800.1;
    scalarValueResults.input = scalarValueCollection_0;
    scalarValueResults.output = scalarValueCollection_1;
    
    
    serializeOk(
      scalarValueResults,
      CONST.STR_scalarValueResults_0
    );
    


};



test.serialization.VoManagedController.prototype.scalarValueResults_deserialize= function() {
  
    var scalarValueResults_0 = deserializeOk(
      CONST.STR_scalarValueResults_0,
      voManaged.ScalarValueResults
    );
    
    assertEquals(2800.1, scalarValueResults_0.getTime(), 0.0);
    
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



test.serialization.VoManagedController.prototype.scalarVariableReal_serialize = function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
  
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
    var scalarVariableReal_0 = new lgb.simulation.model.voManaged.ScalarVariableReal(typeSpecReal_0);
    ok(scalarVariableReal_0 instanceof lgb.simulation.model.voManaged.ScalarVariableReal);
    
    scalarVariableReal_0.setName("scalarVar name");
    scalarVariableReal_0.setIdx(1);
    scalarVariableReal_0.setCausality(Enu.enu_input);
    scalarVariableReal_0.setVariability(Enu.enu_continuous);
    scalarVariableReal_0.setDescription("The Description");
    scalarVariableReal_0.setValueReference(125420);
    
    
    serializeOk(
      scalarVariableReal_0,
      CONST.STR_scalarVariableReal_0
    );
    

 
};




test.serialization.VoManagedController.prototype.scalarVariableReal_deserialize= function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
    
    
    var scalarVariableReal_0 = deserializeOk(
      CONST.STR_scalarVariableReal_0,
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





test.serialization.VoManagedController.prototype.scalarVariableCollection_serialize= function() {
  
    var scalarVariableCollection_0 = test.serialization.VoManagedController.getScalarVariableCollection_A_();
  
    serializeOk(
      scalarVariableCollection_0,
      CONST.STR_scalarVariableCollection_0
    );
    

    var scalarVariableCollection_1 = test.serialization.VoManagedController.getScalarVariableCollection_B_();
  
    serializeOk(
      scalarVariableCollection_1,
      CONST.STR_scalarVariableCollection_1
    );
        
        
};


test.serialization.VoManagedController.prototype.scalarVariableCollection_deserialize= function() {
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
    
  
    var scalarVariableCollection_0 = deserializeOk(
      CONST.STR_scalarVariableCollection_0,
      voManaged.ScalarVariableCollection
    );
    
   

    var scalarVariableReal_0 = scalarVariableCollection_0.getRealVarList()[0];
    ok(scalarVariableReal_0 instanceof lgb.simulation.model.voManaged.ScalarVariableReal);
    
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
    
    
    var scalarVariableCollection_1 = deserializeOk(
      CONST.STR_scalarVariableCollection_1,
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






test.serialization.VoManagedController.prototype.scalarVariablesAll_serialize= function() {
  
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

};




test.serialization.VoManagedController.prototype.scalarVariablesAll_deserialize= function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
    
    var scalarVariablesAll_0 = deserializeOk(
      CONST.STR_scalarVariablesAll_1,
      voManaged.ScalarVariablesAll
    );
    

    
};








test.serialization.VoManagedController.getScalarVariableCollection_A_ = function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
      
    //make TypeSpecReal 1
    var typeSpecReal_0 = new lgb.simulation.model.voNative.TypeSpecReal();
    typeSpecReal_0.start = 20.25;
    typeSpecReal_0.nominal = 21.25;
    typeSpecReal_0.min = 22.25;
    typeSpecReal_0.max = 23.25;
    typeSpecReal_0.unit = "C1";
    
    typeSpecReal_0.startValueStatus = 1;
    typeSpecReal_0.nominalValueStatus = 1;
    typeSpecReal_0.minValueStatus = 1;
    typeSpecReal_0.maxValueStatus = 1;
    typeSpecReal_0.unitValueStatus = 1;
    
    //make ScalarVariableReal 1
    var scalarVariableReal_0 = new lgb.simulation.model.voManaged.ScalarVariableReal(typeSpecReal_0);
    scalarVariableReal_0.setName("scalarVar name");
    scalarVariableReal_0.setIdx(1);
    scalarVariableReal_0.setCausality(Enu.enu_input);
    scalarVariableReal_0.setVariability(Enu.enu_continuous);
    scalarVariableReal_0.setDescription("The Description");
    scalarVariableReal_0.setValueReference(125420);
    
    //make TypeSpecReal 2
    var typeSpecReal_1 = new lgb.simulation.model.voNative.TypeSpecReal();
    typeSpecReal_1.start = 2.25;
    typeSpecReal_1.nominal = 2.26;
    typeSpecReal_1.min = 2.27;
    typeSpecReal_1.max = 2.28;
    typeSpecReal_1.unit = "C2";
    typeSpecReal_1.startValueStatus = 1;
    typeSpecReal_1.nominalValueStatus = 1;
    typeSpecReal_1.minValueStatus = 1;
    typeSpecReal_1.maxValueStatus = 1;
    typeSpecReal_1.unitValueStatus = 1;
    
    //make ScalarVariableReal 2
    var scalarVariableReal_1 = new lgb.simulation.model.voManaged.ScalarVariableReal(typeSpecReal_1);
    scalarVariableReal_1.setName("scalarVar name");
    scalarVariableReal_1.setIdx(1);
    scalarVariableReal_1.setCausality(Enu.enu_input);
    scalarVariableReal_1.setVariability(Enu.enu_discrete);
    scalarVariableReal_1.setDescription("The Description");
    scalarVariableReal_1.setValueReference(125420);
    
    var realList_0 = [scalarVariableReal_0, scalarVariableReal_1];

    var scalarVariableCollection_0 = new lgb.simulation.model.voManaged.ScalarVariableCollection();
    scalarVariableCollection_0.setRealVarList(realList_0);
    
    return scalarVariableCollection_0;
};


test.serialization.VoManagedController.getScalarVariableCollection_B_ = function() {
  
    var Enu = lgb.simulation.model.voNative.Enu.ENUM;
      
    //make TypeSpecReal 0
    var typeSpecReal_0 = new lgb.simulation.model.voNative.TypeSpecReal();
    typeSpecReal_0.start = 1.0;
    typeSpecReal_0.nominal = 1000.0;
    typeSpecReal_0.min = 0.0;
    typeSpecReal_0.max = 5400.01;
    typeSpecReal_0.unit = "Pa";
    
    typeSpecReal_0.startValueStatus = 1;
    typeSpecReal_0.nominalValueStatus = 1;
    typeSpecReal_0.minValueStatus = 1;
    typeSpecReal_0.maxValueStatus = 1;
    typeSpecReal_0.unitValueStatus = 1;
    
    //make ScalarVariableReal 0
    var scalarVariableReal_0 = new lgb.simulation.model.voManaged.ScalarVariableReal(typeSpecReal_0);
    scalarVariableReal_0.setName("ES-23");
    scalarVariableReal_0.setIdx(0);
    scalarVariableReal_0.setCausality(Enu.enu_output);
    scalarVariableReal_0.setVariability(Enu.enu_continuous);
    scalarVariableReal_0.setDescription("This is the pressure in the duct measured in Pa");
    scalarVariableReal_0.setValueReference(7547);
    
    //make TypeSpecReal 1
    var typeSpecReal_1 = new lgb.simulation.model.voNative.TypeSpecReal();
    typeSpecReal_1.start = 12.0;
    typeSpecReal_1.nominal = 50.0;
    typeSpecReal_1.min = 2.0;
    typeSpecReal_1.max = 500000.0;
    typeSpecReal_1.unit = "Pa per meter";
    typeSpecReal_1.startValueStatus = 1;
    typeSpecReal_1.nominalValueStatus = 1;
    typeSpecReal_1.minValueStatus = 1;
    typeSpecReal_1.maxValueStatus = 1;
    typeSpecReal_1.unitValueStatus = 1;
    
    //make ScalarVariableReal 1
    var scalarVariableReal_1 = new lgb.simulation.model.voManaged.ScalarVariableReal(typeSpecReal_1);
    scalarVariableReal_1.setName("PA57-FA");
    scalarVariableReal_1.setIdx(1);
    scalarVariableReal_1.setCausality(Enu.enu_input);
    scalarVariableReal_1.setVariability(Enu.enu_parameter);
    scalarVariableReal_1.setDescription("Pressure in Duct per meter");
    scalarVariableReal_1.setValueReference(55);
    
    var realList_0 = [scalarVariableReal_0, scalarVariableReal_1];

    var scalarVariableCollection_0 = new lgb.simulation.model.voManaged.ScalarVariableCollection();
    scalarVariableCollection_0.setRealVarList(realList_0);
    
    return scalarVariableCollection_0;
      
};





// 
// 
// 
// test.serialization.VoManagedController.prototype.xmlParsedInfo_serialize= function() {
//   
// 
//     
//  
// };
// 
// 
// test.serialization.VoManagedController.prototype.xmlParsedInfo_deserialize= function() {
//   
// 
//     
//  
// };
// 
// 
// test.serialization.VoManagedController.prototype.sessionControlAction_serialize= function() {
//   
// 
//     
//  
// };
// 
// 
// 
// test.serialization.VoManagedController.prototype.sessionControlAction_deserialize= function() {
//   
// 
//     
//  
// };
// 
// 
// 
// test.serialization.VoManagedController.prototype.SessionControlModel_serialize= function() {
//   
// 
//     
//  
// };
// 
// 
// test.serialization.VoManagedController.prototype.SessionControlModel_deserialize= function() {
//   
// 
//     
//  
// };



