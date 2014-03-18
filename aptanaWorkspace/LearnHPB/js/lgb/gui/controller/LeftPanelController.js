goog.provide('lgb.gui.controller.LeftPanelController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.TestController');
goog.require('lgb.gui.controller.ScenarioController');
goog.require('lgb.gui.controller.BuildingController');
goog.require('lgb.gui.controller.SimulationStateControlController');
goog.require('lgb.gui.view.SimulationStateControlGUI');

goog.require('lgb.gui.view.LeftPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');
goog.require('lgb.gui.view.BottomPanelGUI');

lgb.gui.controller.LeftPanelController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.LeftPanelController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LeftPanelController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  
  this.guiView = new lgb.gui.view.LeftPanelGUI(this.dataModel);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  
  this.makeChildGUIcontroller_(lgb.gui.controller.TestController);
  
};



lgb.gui.controller.LeftPanelController.prototype.bind_ = function() {

  this.listenOnce (
    e.ScenarioDataModelLoaded,
    this.onScenarioDataModelLoaded_
  );
  
  this.listenOnce (
      e.SimulationEngineLoaded,
      this.onSimulationEngineLoaded_
  );
    
};


lgb.gui.controller.LeftPanelController.prototype.onSimulationEngineLoaded_ = function(event) {

  var simulationMainController = event.payload;
  this.init3_(simulationMainController);
  
};


lgb.gui.controller.LeftPanelController.prototype.onScenarioDataModelLoaded_ = function(event) {

  var systemListDataModel = event.payload;
  this.init2_(systemListDataModel);
  
};


lgb.gui.controller.LeftPanelController.prototype.init2_ = function(systemListDataModel) {

  this.makeChildGUIcontroller_(lgb.gui.controller.ScenarioController, systemListDataModel);
  this.makeChildGUIcontroller_(lgb.gui.controller.BuildingController, systemListDataModel);

};


lgb.gui.controller.LeftPanelController.prototype.init3_ = function(simulationMainController) {
  
  this.makeChildGUIcontroller_(lgb.gui.controller.SimulationStateControlController, simulationMainController);

};


