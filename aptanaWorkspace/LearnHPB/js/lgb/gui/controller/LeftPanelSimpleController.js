goog.provide('lgb.gui.controller.LeftPanelSimpleController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.TestController');
goog.require('lgb.gui.controller.BuildingSimpleController');


goog.require('lgb.gui.controller.SimulationStateController');
goog.require('lgb.gui.view.SimulationStateControlGUI');

goog.require('lgb.gui.view.LeftPanelSimpleGUI');
goog.require('lgb.gui.model.BaseGuiModel');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.controller.ScenarioMasterController');



/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgb.gui.controller.LeftPanelSimpleController = function() {

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.controller.LeftPanelSimpleController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.LeftPanelSimpleController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  
  this.guiView = new lgb.gui.view.LeftPanelSimpleGUI(this.dataModel);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  this.makeChildGUIcontroller_(lgb.gui.controller.ScenarioMasterController);
  
  this.bind_();
  
};




lgb.gui.controller.LeftPanelSimpleController.prototype.bind_ = function() {

  this.listenOnce (
    e.ScenarioDataModelLoaded,
    this.onScenarioDataModelLoadedFirstTime_
  );
  
  // this.simStateNativeNotifyKey_ = this.listen (
    // se.SimStateNativeNotify,
    // this.onSimStateNativeNotify_
  // );
  
  
};


// lgb.gui.controller.LeftPanelSimpleController.prototype.onSimStateNativeNotify_ = function(event) {
// 
  // var simStateNativeWrapper = event.getPayload();
//   
  // var theInt = simStateNativeWrapper.getIntValue();
//   
  // if (theInt == lgb.simulation.model.voNative.SimStateNativeEnum.simStateNative_3_ready) {
//     
    // this.unlisten (this.simStateNativeNotifyKey_);
    // this.makeChildGUIcontroller_(lgb.gui.controller.ScenarioMasterController);
//     
  // }
//   
//   
  // return;
// };



// lgb.gui.controller.LeftPanelSimpleController.prototype.onSimulationEngineLoaded_ = function(event) {
// 
  // var simulationMainController = event.payload;
  // this.init3_(simulationMainController);
//   
// };


lgb.gui.controller.LeftPanelSimpleController.prototype.onScenarioDataModelLoadedFirstTime_ = function(event) {


  var systemListDataModel = event.payload;

   // this.makeChildGUIcontroller_(lgb.gui.controller.ScenarioController, systemListDataModel);
   
   this.buildingSimpleController_ = this.makeChildGUIcontroller_
    (lgb.gui.controller.BuildingSimpleController, systemListDataModel);


    this.listen (
      e.ScenarioDataModelLoaded,
      this.onScenarioDataModelLoadedNTime_
    );
  
};


lgb.gui.controller.LeftPanelSimpleController.prototype.onScenarioDataModelLoadedNTime_ = function(event) {


  var systemListDataModel = event.payload;
  this.buildingSimpleController_.loadNew(systemListDataModel);
  

};



// 
// lgb.gui.controller.LeftPanelSimpleController.prototype.init3_ = function(simulationMainController) {
//   
  // this.makeChildGUIcontroller_(lgb.gui.controller.SimulationStateController, simulationMainController);
// 
// };
// 


