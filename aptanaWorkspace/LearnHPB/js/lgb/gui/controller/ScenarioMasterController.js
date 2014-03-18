/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.controller.ScenarioMasterController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.model.ScenarioMasterModel');
goog.require('lgb.gui.view.ScenarioMasterGUI');
goog.require('lgb.scenario.controller.ScenarioController');

/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.ScenarioMasterController = function() {

  lgb.core.BaseController.call(this);


};
goog.inherits(lgb.gui.controller.ScenarioMasterController, lgb.core.BaseController);


lgb.gui.controller.ScenarioMasterController.prototype.init = function() {
  
  this.dataModel = new lgb.gui.model.ScenarioMasterModel();
  this.guiView = new lgb.gui.view.ScenarioMasterGUI(this.dataModel);
  

  // this.trigger(e.ScenarioMasterControllerLoaded, this);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
    
};






lgb.gui.controller.ScenarioMasterController.prototype.getView = function() {
  
  return this.guiView;
  
};


lgb.gui.controller.ScenarioMasterController.prototype.load = function(filename) {
  
  this.scenarioController_ = new lgb.scenario.controller.ScenarioController();
  this.scenarioController_.load("Building.xml");
  
};







// lgb.gui.controller.ScenarioMasterController.prototype.onDataModelInitialized_ =
  // function(event) {
// 
  // this.trigger(e.ScenarioParsed, this.dataModel);
// };



lgb.gui.controller.ScenarioMasterController.prototype.onDataModelInitialized_ =
  function(event) {

  this.trigger(e.ScenarioDataModelLoaded, this.dataModel.systemList);
  
  // this.listen(e.LayoutChange, this.onLayoutChange_);
    
  
};


