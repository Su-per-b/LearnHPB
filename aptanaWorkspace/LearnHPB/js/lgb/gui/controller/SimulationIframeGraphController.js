/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationIframeGraphController');

goog.require('lgb.core.BaseController');
goog.require('lgb.chart.view.SimulationIframeGraphGUI');



/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationIframeGraphController = function() {

  this.TITLE_ = 'Graph';
  lgb.core.BaseController.call(this);
  
  this.bind1_();

};
goog.inherits(lgb.gui.controller.SimulationIframeGraphController, lgb.core.BaseController);




lgb.gui.controller.SimulationIframeGraphController.prototype.init = function(simulationDataModel) {
  
  this.dataModel = simulationDataModel;

};


lgb.gui.controller.SimulationIframeGraphController.prototype.init2_ = function() {
  
 
  this.guiView = new lgb.chart.view.SimulationIframeGraphGUI (this.dataModel, this.TITLE_);
  this.guiView.init();
  
  this.listen(e.LayoutChange, this.onLayoutChange_);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
      
};





lgb.gui.controller.SimulationIframeGraphController.prototype.onSimulationInitialized_ = function(event) {

  this.init2_();

};



lgb.gui.controller.SimulationIframeGraphController.prototype.bind1_ = function() {

    this.listen (
        e.SimulationInitialized,
        this.onSimulationInitialized_
    );

   
};






lgb.gui.controller.SimulationIframeGraphController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};



