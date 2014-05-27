/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.controller.ScenarioController');

goog.require('lgb.core.BaseController');
goog.require('lgb.scenario.model.ScenarioModel');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.scenario.controller.ScenarioController = function() {

  lgb.core.BaseController.call(this);
  this.init_();

};
goog.inherits(lgb.scenario.controller.ScenarioController, lgb.core.BaseController);


lgb.scenario.controller.ScenarioController.prototype.init_ = function() {
  

  this.dataModel = new lgb.scenario.model.ScenarioModel();

  this.listenTo(this.dataModel,
     e.DataModelInitialized,
      this.onDataModelInitialized_);

  this.bind_();
  
};


lgb.scenario.controller.ScenarioController.prototype.bind_ = function() {
  this.listen(e.RequestLoadScenario, this.onRequestLoadScenario_);
};



lgb.scenario.controller.ScenarioController.prototype.onRequestLoadScenario_ = function(event) {
  
  var fileName = event.payload;
  this.dataModel.load(fileName);
  
  
};


lgb.scenario.controller.ScenarioController.prototype.load = function(fileName) {
    this.dataModel.load(fileName);
};




lgb.scenario.controller.ScenarioController.prototype.onDataModelInitialized_ =
  function(event) {

  this.trigger(e.ScenarioDataModelLoaded, this.dataModel.systemList);
  
  
};


