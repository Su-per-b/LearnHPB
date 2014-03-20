/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.chart.controller.LayoutController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.controller.SimulationStateController');
goog.require('lgb.chart.view.LayoutView');

goog.require('lgb.chart.controller.GraphController');

goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.StandAlonePanelController');



/**
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.LayoutController = function() {
  lgb.core.BaseController.call(this);
  

};
goog.inherits(lgb.chart.controller.LayoutController, lgb.core.BaseController);


/**
 * @private
 */
lgb.chart.controller.LayoutController.prototype.init = function() {

    this.dataModel = new lgb.gui.model.BaseGuiModel();
    this.guiView = new lgb.chart.view.LayoutView(this.dataModel);
    
    this.bind_();
    this.triggerGUI();

    this.makeChildGUIcontroller_(lgb.gui.controller.StandAlonePanelController);
};



lgb.chart.controller.LayoutController.prototype.bind_ = function() {


  this.listen(e.WindowResize, this.onWindowResize_);
  
  this.listenTo(this.guiView, e.LayoutChange, this.onLayoutChange_);
    
  this.listenOnce (
      e.SimulationEngineLoaded,
      this.onSimulationEngineLoaded_
  );
    
};



lgb.chart.controller.LayoutController.prototype.onWindowResize_ = function(event) {
    this.guiView.calculateLayout(event.payload);
};


lgb.chart.controller.LayoutController.prototype.onLayoutChange_ = function(event) {
    
    this.guiView.calculateLayout();
    this.dispatch(event);
    
};


lgb.chart.controller.LayoutController.prototype.onSimulationEngineLoaded_ = function(event) {

  var simulationMainController = event.payload;
  this.init3_(simulationMainController);
  
};


lgb.chart.controller.LayoutController.prototype.init3_ = function(simulationMainController) {
  
  

  this.makeChildGUIcontroller_(lgb.gui.controller.SimulationStateController, simulationMainController);
  
 // this.makeChildGUIcontroller_(lgb.chart.controller.GraphController, simulationMainController);
  

  
};


