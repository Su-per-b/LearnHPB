goog.provide('lgb.gui.controller.LeftPanelSimpleGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.TestController');
goog.require('lgb.gui.controller.ScenarioController');
goog.require('lgb.gui.controller.BuildingSimpleGUIController');
goog.require('lgb.gui.controller.SimulationStateControlController');
goog.require('lgb.gui.view.SimulationStateControlGUI');

goog.require('lgb.gui.view.LeftPanelGUISimple');
goog.require('lgb.gui.model.BaseGuiModel');
goog.require('lgb.gui.view.BottomPanelGUI');

lgb.gui.controller.LeftPanelSimpleGUIController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.LeftPanelSimpleGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LeftPanelSimpleGUIController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  
  this.guiView = new lgb.gui.view.LeftPanelGUISimple(this.dataModel);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();
  
  // this.makeChildGUIcontroller_(lgb.gui.controller.TestController);
  
};



lgb.gui.controller.LeftPanelSimpleGUIController.prototype.bind_ = function() {

  this.listenOnce (
    e.ScenarioParsed2,
    this.onScenarioParsed2_
  );
  
  this.listenOnce (
      e.SimulationEngineLoaded,
      this.onSimulationEngineLoaded_
  );
    
};


lgb.gui.controller.LeftPanelSimpleGUIController.prototype.onSimulationEngineLoaded_ = function(event) {

  var simulationMainController = event.payload;
  this.init3_(simulationMainController);
  
};


lgb.gui.controller.LeftPanelSimpleGUIController.prototype.onScenarioParsed2_ = function(event) {

  var systemListDataModel = event.payload;
  this.init2_(systemListDataModel);
  

  
};


lgb.gui.controller.LeftPanelSimpleGUIController.prototype.init2_ = function(systemListDataModel) {

   // this.makeChildGUIcontroller_(lgb.gui.controller.ScenarioController, systemListDataModel);
   this.makeChildGUIcontroller_(lgb.gui.controller.BuildingSimpleGUIController, systemListDataModel);

};


lgb.gui.controller.LeftPanelSimpleGUIController.prototype.init3_ = function(simulationMainController) {
  
  // this.makeChildGUIcontroller_(lgb.gui.controller.SimulationStateControlController, simulationMainController);

};


