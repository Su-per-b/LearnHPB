/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.controller.ScenarioController');

goog.require('lgb.controller.BaseController');
goog.require('lgb.model.scenario.Base');
goog.require('lgb.model.scenario.Bs2');


/**
 * @constructor
 * @extends lgb.controller.BaseController
 */
lgb.controller.ScenarioController = function() {

  lgb.controller.BaseController.call(this);


  this.dataModel = new lgb.model.scenario.Base();
  
  this.listenToOnce(this.dataModel,
     e.DataModelInitialized,
      this.onDataModelInitialized_);
      
  this.dataModel.load();

  
  
  this.dataModel2 = new lgb.model.scenario.Bs2();

      
  this.listenToOnce(this.dataModel2,
     e.DataModelInitialized,
      this.onDataModelInitialized2_);

  this.dataModel2.load();
  
  
};
goog.inherits(lgb.controller.ScenarioController, lgb.controller.BaseController);



lgb.controller.ScenarioController.prototype.onDataModelInitialized_ =
  function(event) {

  this.trigger(e.ScenarioParsed, this.dataModel);
};



lgb.controller.ScenarioController.prototype.onDataModelInitialized2_ =
  function(event) {

  this.trigger(e.ScenarioParsed2, this.dataModel2.systemList);
  
};


