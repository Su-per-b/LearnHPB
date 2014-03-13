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
  
/*
  this.dataModel = new lgb.scenario.model.Base();
  
  this.listenToOnce(this.dataModel,
     e.DataModelInitialized,
      this.onDataModelInitialized_);
      
  this.dataModel.load();
*/

  
  this.dataModel = new lgb.scenario.model.ScenarioModel();

  this.listenToOnce(this.dataModel,
     e.DataModelInitialized,
      this.onDataModelInitialized_);

  this.dataModel.load("VerySimpleScenario.xml");
  
};




// lgb.scenario.controller.ScenarioController.prototype.onDataModelInitialized_ =
  // function(event) {
// 
  // this.trigger(e.ScenarioParsed, this.dataModel);
// };



lgb.scenario.controller.ScenarioController.prototype.onDataModelInitialized_ =
  function(event) {

  this.trigger(e.ScenarioParsed2, this.dataModel.systemList);
  
};


