/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.controller.IntegratedController');

goog.require('lgb.core.BaseController');
goog.require('lgb.scenario.model.MainModel');
goog.require('lgb.integrated.model.MainModel');
goog.require('lgb.simulation.events.ResultEventList');
goog.require('lgb.simulation.events.InitialStateRequest');
goog.require('lgb.simulation.model.voManaged.InitialState');
goog.require('lgb.simulation.model.voManaged.ScalarValueCollection');
goog.require('lgb.simulation.model.voManaged.SerializableVector');
goog.require('lgb.simulation.model.voManaged.ScalarVariableReal');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.integrated.controller.IntegratedController = function() {

 if ( lgb.integrated.controller.IntegratedController.locked ) {
   debugger;
   lgb.logSevere('You may not instantiate a Singleton - use: getInstance()');
 }
 
 
  lgb.core.BaseController.call(this);
  this.init_();
  
  
  lgb.integrated.controller.IntegratedController._singletonInstance = this;
  
};
goog.inherits(lgb.integrated.controller.IntegratedController, lgb.core.BaseController);



lgb.integrated.controller.IntegratedController.locked = true;


lgb.integrated.controller.IntegratedController.getInstance = function() {
            
    if ( lgb.integrated.controller.IntegratedController._singletonInstance ) {
      
      return lgb.integrated.controller.IntegratedController._singletonInstance;
      
    } else {
      var instance;
      lgb.integrated.controller.IntegratedController.locked = false;
      instance = new lgb.integrated.controller.IntegratedController();
      lgb.integrated.controller.IntegratedController.locked = true;
      
      return instance;
    }
    
};



lgb.integrated.controller.IntegratedController.prototype.init_ = function() {
  
  this.dataModel = new lgb.integrated.model.MainModel();
  this.bind_();

};

lgb.integrated.controller.IntegratedController.prototype.getVariableByName = function(name) {
  
  return this.dataModel.getVariableByName(name);

};




lgb.integrated.controller.IntegratedController.prototype.bind_ = function() {

  this.listen (
    e.ScenarioDataModelLoaded,
    this.onScenarioDataModelLoaded_
  );
  
  this.listen (
    e.DisplayUnitSystemChangeNotify,
    this.onDisplayUnitSystemChangeNotify_
  );
  
  this.listen (
    se.XMLparsedEvent,
    this.onXMLparsedEvent_
  );
  
  this.listen (
    se.ResultEventList,
    this.onResultEventList_
  );

  this.listen (
    e.RequestIntegratedVariableChange,
    this.onRequestIntegratedVariableChange_
  );

    this.listen (
        se.SimStateNativeNotify,
        this.onSimStateNativeNotify_
    );  


};



lgb.integrated.controller.IntegratedController.prototype.onSimStateNativeNotify_ = function(event) {

    
  var simStateNativeWrapper = event.getPayload();
  
  
  var theInt = simStateNativeWrapper.getIntValue();
  var ENUM = lgb.simulation.model.voNative.SimStateNative.ENUM;
  
  
    switch(theInt) {

        case ENUM.simStateNative_2_xmlParse_completed:  {
            
            
            var integratedVariable = this.getVariableByName('SIMstart2');
            var v = integratedVariable.getInternalValue();
           
            var sVal = new lgb.simulation.model.voManaged.ScalarValueReal(5000,v);
            
            //var vector = new lgb.simulation.model.voManaged.SerializableVector('ScalarVariableReal', [sVar]);
            //var state = new lgb.simulation.model.voManaged.InitialState(vector);
            
            
            var collection = new lgb.simulation.model.voManaged.ScalarValueCollection([sVal]);
            

            var newEvent = new lgb.simulation.events.InitialStateRequest(collection);
            this.dispatch(newEvent);
        }
        break;
        
    }
  


};
lgb.integrated.controller.IntegratedController.prototype.onRequestIntegratedVariableChange_ = function(event) {

    
    var integratedVariable = event.payload.integratedVariable;
    var newValueDisplay = event.payload.newValueDisplay;
    
    if (integratedVariable.scope == "input" && undefined != integratedVariable.scalarVariableName) {
        this.processInputVarChange_(integratedVariable, newValueDisplay); 
    } else if (integratedVariable.scope == "gui") {
        this.processGUIVarChange_(integratedVariable, newValueDisplay);
    }
    
    
    return;

};


lgb.integrated.controller.IntegratedController.prototype.processInputVarChange_ = function(integratedVariable, newValueDisplay) {

    var newValueInternal = integratedVariable.convertDisplayToInternalValue(newValueDisplay);
    
    var newPayload = {
       idx : integratedVariable.getIdx(),
       value : newValueInternal
    };
    
    
    if (undefined != integratedVariable.getIdx()) {
        
        this.trigger(se.RequestSimulationVariableChange, newPayload);
    }
    
    return;

};

lgb.integrated.controller.IntegratedController.prototype.processGUIVarChange_ = function(integratedVariable, newValueDisplay) {


    integratedVariable.setInternalValue(newValueDisplay);
    
    //var integratedVariable2 = this.getVariableByName('SIMstart2');
    
    return;

};



lgb.integrated.controller.IntegratedController.prototype.onResultEventList_ = function(event) {


    this.dataModel.processResultEventList(event.getPayload());
    
    this.trigger(e.IntegratedDataModelValuesUpdated, this.dataModel);
    
    return;

};



lgb.integrated.controller.IntegratedController.prototype.onXMLparsedEvent_ = function(event) {

    this.dataModel.processXMLparsedInfo(event.getPayload());
    
    this.trigger(e.IntegratedDataModelSimulationInitialized, this.dataModel);

};



lgb.integrated.controller.IntegratedController.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {

    this.dataModel.changeDisplayUnitSystem(event.payload);

};



lgb.integrated.controller.IntegratedController.prototype.onScenarioDataModelLoaded_ = function(event) {

   this.dataModel.parseSrcObj(event.payload);
   this.trigger(e.IntegratedDataModelScenarioInitialized, this.dataModel);
    
   
};
