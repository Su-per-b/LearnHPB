goog.provide('lgb.gui.controller.BottomPanelGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.SimulationConsoleController');
goog.require('lgb.gui.controller.SimulationOutputController');
goog.require('lgb.gui.controller.SimulationInputController');
goog.require('lgb.gui.controller.SimulationResultsController');


goog.require('lgb.chart.controller.GraphController');




/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgb.gui.controller.BottomPanelGUIController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgb.gui.controller.BottomPanelGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgb.gui.controller.BottomPanelGUIController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  this.bind_();

};

lgb.gui.controller.BottomPanelGUIController.prototype.bind_ = function() {

    this.listenOnce (
        e.SimulationEngineLoaded,
        this.onSimulationEngineLoaded_
    );
    
    this.listen (
        e.IntegratedDataModelInitialized,
        this.onIntegratedDataModelInitialized_
    );
    
};



lgb.gui.controller.BottomPanelGUIController.prototype.onIntegratedDataModelInitialized_ = function(event) {
  
  var integratedDataModel = event.payload;
  var graphModelList = integratedDataModel.graphModelList;
  
  this.each(graphModelList, this.makeOneGraphC3_);
  
};


lgb.gui.controller.BottomPanelGUIController.prototype.makeOneGraphC3_ = function(graphGUIModelC3) {
  
  this.makeChildGUIcontroller_
     (lgb.chart.controller.GraphController, graphGUIModelC3);
     
};



lgb.gui.controller.BottomPanelGUIController.prototype.makeOneGraph_ = function(graphGUIModel) {
  
  this.makeChildGUIcontroller_
     (lgb.chart.controller.GraphController, graphGUIModel);
     
};






lgb.gui.controller.BottomPanelGUIController.prototype.onSimulationEngineLoaded_ = function(event) {
  
  simMainController = event.payload;
  var simDataModel = simMainController.getDataModel();
  
  this.init2_(simDataModel);

};


lgb.gui.controller.BottomPanelGUIController.prototype.init2_ = function(simDataModel) {
  

  this.makeChildGUIcontroller_
    (lgb.gui.controller.SimulationConsoleController, simDataModel);


  // this.makeChildGUIcontroller_
    // (lgb.gui.controller.SimulationInputController, simDataModel);
// 

  this.makeChildGUIcontroller_
    (lgb.gui.controller.SimulationOutputController, simDataModel);
    
     
  this.makeChildGUIcontroller_
    (lgb.gui.controller.SimulationResultsController, simDataModel);
    
    

   

   
};



