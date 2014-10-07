goog.provide('lgb.gui.controller.LeftPanelSimpleController');

goog.require('lgb.core.BaseController');

goog.require('lgb.gui.controller.BuildingController');
goog.require('lgb.gui.controller.SimulationStateController');
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
     e.IntegratedDataModelInitialized,
     this.onIntegratedDataModelInitializedFirstTime_
   );
  

  
};

// 
// lgb.gui.controller.LeftPanelSimpleController.prototype.onDisplayUnitSystemChangeRequest_ = function(event) {
// 
// 
  // var newUnit = event.payload;
//   
  // //this.guiView.setNewUnit(newUnit);
// 
// 
  // return;
// 
// };
// 




lgb.gui.controller.LeftPanelSimpleController.prototype.onIntegratedDataModelInitializedFirstTime_ = function(event) {


   var integratedMainModel = event.payload;
   
   
   this.buildingSimpleController_ = this.makeChildGUIcontroller_
    (lgb.gui.controller.BuildingController, integratedMainModel);


    this.listen (
      e.IntegratedDataModelInitialized,
      this.onIntegratedDataModelInitializedNTime_
    );
  
};


lgb.gui.controller.LeftPanelSimpleController.prototype.onIntegratedDataModelInitializedNTime_ = function(event) {

   var integratedMainModel = event.payload;
 
   this.buildingSimpleController_.loadNew(integratedMainModel);
  
};


