/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.gui.controller.SimulationGraphController');

goog.require('lgb.core.BaseController');
goog.require('lgb.chart.view.GraphGUI_05');
goog.require('lgb.chart.view.GraphGUI_04');
goog.require('lgb.chart.model.GraphGUImodel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.gui.controller.SimulationGraphController = function() {

  this.TITLE_ = 'Graph';
  lgb.core.BaseController.call(this);
  


};
goog.inherits(lgb.gui.controller.SimulationGraphController, lgb.core.BaseController);



lgb.gui.controller.SimulationGraphController.prototype.init = function(simDataModel) {

  this.dataModel = simDataModel;
  this.bind1_();
  
};




lgb.gui.controller.SimulationGraphController.prototype.bind1_ = function() {


    this.listen (
        e.SimulationInitialized,
        this.onSimulationInitialized_
    );
    
};

lgb.gui.controller.SimulationGraphController.prototype.onSimulationInitialized_ = function(event) {


  this.init2_();

};


lgb.gui.controller.SimulationGraphController.prototype.bind2_ = function() {

  this.relayLocal(
    this.guiView,
    e.RequestAddToParentGUI);
   
};


lgb.gui.controller.SimulationGraphController.prototype.onLayoutChange_ = function(event) {

  this.guiView.calculateLayout(event.payload);

};



lgb.gui.controller.SimulationGraphController.prototype.init2_ = function() {
  
  this.chartModel = new lgb.chart.model.GraphGUImodel();
  
  this.guiView = new lgb.chart.view.GraphGUI_04 (this.dataModel, this.chartModel);




  this.bind2_();
  this.guiView.init();
  
  this.listen(e.LayoutChange, this.onLayoutChange_);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
    
    
};



