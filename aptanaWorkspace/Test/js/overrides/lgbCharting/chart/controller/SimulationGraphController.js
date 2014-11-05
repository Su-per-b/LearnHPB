/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgbCharting.chart.controller.SimulationGraphController');

goog.require('lgb.core.BaseController');

goog.require('lgb.chart.view.GraphGUI');
goog.require('lgb.chart.model.GraphGUImodel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgbCharting.chart.controller.SimulationGraphController = function() {

  this.TITLE_ = 'Graph';
  lgb.core.BaseController.call(this);

};
goog.inherits(lgbCharting.chart.controller.SimulationGraphController, lgb.core.BaseController);



lgbCharting.chart.controller.SimulationGraphController.prototype.init = function(simDataModel) {

  this.dataModel = simDataModel;
  this.bind1_();
  
  this.init2_();
  
};




lgbCharting.chart.controller.SimulationGraphController.prototype.bind1_ = function() {

  this.listen(
      e.LayoutChange, 
      this.onLayoutChange_
  );
  
};



lgbCharting.chart.controller.SimulationGraphController.prototype.bind2_ = function() {


    this.listen (
        e.IntegratedDataModelValuesUpdated,
        this.onIntegratedDataModelValuesUpdated_
    );
    

};


lgbCharting.chart.controller.SimulationGraphController.prototype.onLayoutChange_ = function(event) {


    if ( undefined != this.guiView_08) {
        this.guiView_08.calculateLayout(event.payload);
    }

};

lgbCharting.chart.controller.SimulationGraphController.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {


  this.chartModel_08.updateValues(event.payload);

  return;
};





lgbCharting.chart.controller.SimulationGraphController.prototype.init2_ = function() {
  

  this.guiView_08 = new lgb.chart.view.GraphGUI (this.dataModel);
  this.bind2_();


  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08);

};



