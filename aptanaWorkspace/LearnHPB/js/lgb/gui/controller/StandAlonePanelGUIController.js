goog.provide('lgb.gui.controller.StandAlonePanelGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.SimulationConsoleController');
goog.require('lgb.gui.controller.SimulationOutputController');
goog.require('lgb.gui.controller.SimulationInputController');
goog.require('lgb.gui.controller.SimulationResultsController');
goog.require('lgb.chart.controller.GraphController');

goog.require('lgb.gui.view.StandAlonePanelGUI');



lgb.gui.controller.StandAlonePanelGUIController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.StandAlonePanelGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.StandAlonePanelGUIController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.StandAlonePanelGUI(this.dataModel);
  
  this.bind_();
  
  this.triggerGUI();

};

lgb.gui.controller.StandAlonePanelGUIController.prototype.bind_ = function() {

    this.listenOnce (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
};


lgb.gui.controller.StandAlonePanelGUIController.prototype.onSimulationEngineLoaded_ = function(event) {
  
  simMainController = event.payload;
  var simDataModel = simMainController.getDataModel();
  
  this.init2_(simDataModel);

};


lgb.gui.controller.StandAlonePanelGUIController.prototype.init2_ = function(simDataModel) {
  

  this.makeChildGUIcontroller_
    (lgb.gui.controller.SimulationConsoleController, simDataModel);

  this.makeChildGUIcontroller_
    (lgb.gui.controller.SimulationInputController, simDataModel);


  this.makeChildGUIcontroller_
    (lgb.gui.controller.SimulationOutputController, simDataModel);
    
     
  // this.makeChildGUIcontroller_
    // (lgb.gui.controller.SimulationResultsController, simDataModel);
   
   
  this.makeChildGUIcontroller_
    (lgb.chart.controller.GraphController, simDataModel);
    

   
   
};






