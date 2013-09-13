/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.controller.ScenarioController');

goog.require('lgb.core.BaseController');
goog.require('lgb.scenario.model.Base');
goog.require('lgb.scenario.model.Bs2');


/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.scenario.controller.ScenarioController = function() {

  lgb.core.BaseController.call(this);


  this.dataModel = new lgb.scenario.model.Base();
  
  this.listenToOnce(this.dataModel,
     e.DataModelInitialized,
      this.onDataModelInitialized_);
      
  this.dataModel.load();

  
  
  this.dataModel2 = new lgb.scenario.model.Bs2();

      
  this.listenToOnce(this.dataModel2,
     e.DataModelInitialized,
      this.onDataModelInitialized2_);

  this.dataModel2.load();
  
  
};
goog.inherits(lgb.scenario.controller.ScenarioController, lgb.core.BaseController);



lgb.scenario.controller.ScenarioController.prototype.onDataModelInitialized_ =
  function(event) {

  this.trigger(e.ScenarioParsed, this.dataModel);
};



lgb.scenario.controller.ScenarioController.prototype.onDataModelInitialized2_ =
  function(event) {

  this.trigger(e.ScenarioParsed2, this.dataModel2.systemList);
  
};


