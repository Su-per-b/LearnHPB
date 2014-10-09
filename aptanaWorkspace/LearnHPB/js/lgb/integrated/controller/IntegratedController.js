/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.controller.IntegratedController');

goog.require('lgb.core.BaseController');
goog.require('lgb.scenario.model.ScenarioModel');
goog.require('lgb.integrated.model.MainModel');
goog.require('lgb.simulation.events.ResultEventList');



/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.integrated.controller.IntegratedController = function() {

  lgb.core.BaseController.call(this);
  this.init_();

};
goog.inherits(lgb.integrated.controller.IntegratedController, lgb.core.BaseController);



lgb.integrated.controller.IntegratedController.prototype.init_ = function() {
  
  this.dataModel = new lgb.integrated.model.MainModel();
  this.bind_();

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
  
  
  
  

};



lgb.integrated.controller.IntegratedController.prototype.onResultEventList_ = function(event) {


    this.dataModel.processResultEventList(event.getPayload());
    
    this.trigger(e.IntegratedDataModelValuesUpdated, this.dataModel);
    
    return;

};



lgb.integrated.controller.IntegratedController.prototype.onXMLparsedEvent_ = function(event) {

    this.dataModel.processXMLparsedInfo(event.getPayload());
    
    this.trigger(e.IntegratedDataModelVariablesUpdated, this.dataModel);

};



lgb.integrated.controller.IntegratedController.prototype.onDisplayUnitSystemChangeNotify_ = function(event) {

    this.dataModel.changeDisplayUnitSystem(event.payload);

};



lgb.integrated.controller.IntegratedController.prototype.onScenarioDataModelLoaded_ = function(event) {

   this.dataModel.parseSrcObj(event.payload);
   this.trigger(e.IntegratedDataModelInitialized, this.dataModel);
    
   
};
