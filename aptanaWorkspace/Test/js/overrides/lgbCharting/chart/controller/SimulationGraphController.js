/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgbCharting.chart.controller.SimulationGraphController');

goog.require('lgb.core.BaseController');

goog.require('lgb.chart.view.GraphGUI_05');
goog.require('lgb.chart.view.GraphGUI_06');
goog.require('lgb.chart.view.GraphGUI_07');
goog.require('lgb.chart.view.GraphGUI_08');

goog.require('lgb.chart.model.GraphGUImodel');
goog.require('lgb.chart.model.GraphGUImodel_05');
goog.require('lgb.chart.model.GraphGUImodel_06');
goog.require('lgb.chart.model.GraphGUImodel_07');
goog.require('lgb.chart.model.GraphGUImodel_08');


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
    if ( undefined != this.guiView_08b) {
        this.guiView_08b.calculateLayout(event.payload);
    }
    if ( undefined != this.guiView_08c) {
        this.guiView_08c.calculateLayout(event.payload);
    }
    if ( undefined != this.guiView_08d) {
        this.guiView_08d.calculateLayout(event.payload);
    }
    if ( undefined != this.guiView_08d) {
        this.guiView_08e.calculateLayout(event.payload);
    }
    if ( undefined != this.guiView_08d) {
        this.guiView_08f.calculateLayout(event.payload);
    }
};

lgbCharting.chart.controller.SimulationGraphController.prototype.onIntegratedDataModelValuesUpdated_ = function(event) {


  //this.chartModel_05.updateValues(event.payload);
  // this.chartModel_06.updateValues(event.payload);
  // this.chartModel_07.updateValues(event.payload);
  this.chartModel_08.updateValues(event.payload);
  this.chartModel_08b.updateValues(event.payload);
  this.chartModel_08c.updateValues(event.payload);
  this.chartModel_08d.updateValues(event.payload);
  this.chartModel_08e.updateValues(event.payload);
  this.chartModel_08f.updateValues(event.payload);
  
  //this.guiView_05.updateValues();

  return;
};



lgbCharting.chart.controller.SimulationGraphController.prototype.init2_ = function() {
  

  // this.chartModel_06 = new lgb.chart.model.GraphGUImodel_06();
  // this.guiView_06 = new lgb.chart.view.GraphGUI_06 (this.chartModel_06);
// 
  // this.chartModel_07 = new lgb.chart.model.GraphGUImodel_07();
  // this.guiView_07 = new lgb.chart.view.GraphGUI_07 (this.chartModel_07);
  
  this.chartModel_08 = new lgb.chart.model.GraphGUImodel_08();
  this.chartModel_08.setTitle('ZN2 Temp');
  this.chartModel_08.addVariable('y_ZN_5', 5, 30);
  this.chartModel_08.addVariable('y_SYS_1', 5, 30);
  this.chartModel_08.makeRandomData(20);
  
  
  
  this.chartModel_08b = new lgb.chart.model.GraphGUImodel_08();
  this.chartModel_08b.setTitle('Outside Temp');
  this.chartModel_08b.addVariable('y_SYS_1', 5, 30);
  this.chartModel_08b.makeRandomData(20);
  
  
  this.chartModel_08c = new lgb.chart.model.GraphGUImodel_08();
  this.chartModel_08c.setTitle('ZN2 Heat');
  this.chartModel_08c.addVariable('u_ZN_5', 5, 30);
  this.chartModel_08c.makeRandomData(20);
  
  this.chartModel_08d = new lgb.chart.model.GraphGUImodel_08();
  this.chartModel_08d.setTitle('ZN2 Cool');
  this.chartModel_08d.addVariable('u_ZN_6', 5, 30);
  this.chartModel_08d.makeRandomData(20);
  
  this.chartModel_08e = new lgb.chart.model.GraphGUImodel_08();
  this.chartModel_08e.setTitle('ZN2 Heat Night ');
  this.chartModel_08e.addVariable('u_ZN_7', 5, 30);
  this.chartModel_08e.makeRandomData(20);
  
  this.chartModel_08f = new lgb.chart.model.GraphGUImodel_08();
  this.chartModel_08f.setTitle('ZN2 Cool Night ');
  this.chartModel_08f.addVariable('u_ZN_8', 5, 30);
  this.chartModel_08f.makeRandomData(20);
  
  
  this.guiView_08 = new lgb.chart.view.GraphGUI_08 (this.chartModel_08);
  this.guiView_08b = new lgb.chart.view.GraphGUI_08 (this.chartModel_08b);
  this.guiView_08c = new lgb.chart.view.GraphGUI_08 (this.chartModel_08c);
  this.guiView_08d = new lgb.chart.view.GraphGUI_08 (this.chartModel_08d);
  this.guiView_08e = new lgb.chart.view.GraphGUI_08 (this.chartModel_08e);
  this.guiView_08f = new lgb.chart.view.GraphGUI_08 (this.chartModel_08f);
  
  this.bind2_();
  
  // this.guiView_06.init();
  // this.guiView_07.init();
  
  // this.triggerLocal(e.RequestAddToParentGUI, this.guiView_06);
  // this.triggerLocal(e.RequestAddToParentGUI, this.guiView_07);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08b);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08c);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08d);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08e);
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView_08f);
    
};



