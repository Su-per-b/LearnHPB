/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.SimulationGraphController');

goog.require('lgb.core.BaseController');

goog.require('lgb.chart.view.GraphGUI_05');
goog.require('lgb.chart.view.GraphGUI_06');

goog.require('lgb.chart.model.GraphGUImodel');
goog.require('lgb.chart.model.GraphGUImodel_05');
goog.require('lgb.chart.model.GraphGUImodel_06');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.SimulationGraphController = function() {

  this.TITLE_ = 'Graph';
  lgb.core.BaseController.call(this);
  


};
goog.inherits(lgb.chart.controller.SimulationGraphController, lgb.core.BaseController);



lgb.chart.controller.SimulationGraphController.prototype.init = function(simDataModel) {

  this.dataModel = simDataModel;

  
  this.chartModel_05 = new lgb.chart.model.GraphGUImodel_05();
  this.guiView_05 = new lgb.chart.view.GraphGUI_05 (this.dataModel, this.chartModel_05);
  this.guiView_05.init();
  
  this.bind1_();
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_05);
  
};




lgb.chart.controller.SimulationGraphController.prototype.bind1_ = function() {


    this.listen (
        e.SimulationInitialized,
        this.onSimulationInitialized_
    );
    
  this.listen(
      e.LayoutChange, 
      this.onLayoutChange_
  );
  
  
  this.relayLocal(
    this.guiView_05,
    e.RequestAddToParentGUI);
    
};

lgb.chart.controller.SimulationGraphController.prototype.onSimulationInitialized_ = function(event) {


  this.init2_();

};


lgb.chart.controller.SimulationGraphController.prototype.bind2_ = function() {


    
  this.relayLocal(
    this.guiView_06,
    e.RequestAddToParentGUI);
    
    
    this.listen (
        e.IntegratedDataModelValuesUpdated,
        this.onIntegratedDataModelValuesUpdated_
    );
    

    
   
};


lgb.chart.controller.SimulationGraphController.prototype.onLayoutChange_ = function(event) {

    if ( undefined != this.guiView_05) {
        this.guiView_05.calculateLayout(event.payload);
    }
    if ( undefined != this.guiView_06) {
        this.guiView_06.calculateLayout(event.payload);
    }

};

lgb.chart.controller.SimulationGraphController.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {

 //this.guiView.calculateLayout(event.payload);
  
  this.chartModel_05.updateValues(event.payload);
  this.chartModel_06.updateValues(event.payload);
  
  this.guiView_05.updateValues();
  this.guiView_06.updateValues();

};






lgb.chart.controller.SimulationGraphController.prototype.init2_ = function() {
  

  this.chartModel_06 = new lgb.chart.model.GraphGUImodel_06();
  this.guiView_06 = new lgb.chart.view.GraphGUI_06 (this.dataModel, this.chartModel_06);

  this.bind2_();
  

  this.guiView_06.init();
  

  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_06);
    
    
};



