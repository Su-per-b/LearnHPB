goog.provide('lgbCharting.gui.controller.BottomPanelGUIController');

goog.require('lgb.core.BaseController');
goog.require('lgb.gui.view.BottomPanelGUI');
goog.require('lgb.gui.model.BaseGuiModel');

goog.require('lgb.gui.controller.SimulationConsoleController');
goog.require('lgb.gui.controller.SimulationOutputController');
goog.require('lgb.gui.controller.SimulationInputController');
goog.require('lgb.gui.controller.SimulationResultsController');


goog.require('lgb.chart.controller.SimulationGraphController');




/**
 * @constructor
 * @extends {lgb.core.BaseController}
 */
lgbCharting.gui.controller.BottomPanelGUIController = function() {

  lgb.core.BaseController.call(this);
};
goog.inherits(lgbCharting.gui.controller.BottomPanelGUIController, lgb.core.BaseController);


/**
 * Initializes the Main Controller after the document is ready
 */
lgbCharting.gui.controller.BottomPanelGUIController.prototype.init = function() {

  this.dataModel = new lgb.gui.model.BaseGuiModel();
  this.guiView = new lgb.gui.view.BottomPanelGUI(this.dataModel);
  
  this.triggerLocal(e.RequestAddToParentGUI, this.guiView);
  
  // this.init2_({});
};


// 
// lgbCharting.gui.controller.BottomPanelGUIController.prototype.init2_ = function(simDataModel) {
//   
  // this.makeCharts_(simDataModel); 
//  
// };
// 


// 
// 
// lgbCharting.gui.controller.BottomPanelGUIController.prototype.makeCharts_ = function(simDataModel) {
//   
  // this.chartController01_ = this.makeChildGUIcontroller_
     // (lgb.chart.controller.SimulationGraphController, simDataModel);
//     
// 
//     
   // var chartModel_01 = new lgb.chart.model.GraphGUImodel();
   // chartModel_01.setTitle('ZN2 Temp');
   // chartModel_01.addVariable('y_ZN_5', 5, 30);
   // chartModel_01.addVariable('y_SYS_1', 5, 30);
   // chartModel_01.makeRandomData(20);
//   
   // this.chartController01_.setChartModel(chartModel_01);
// 
//     
  // this.chartController02_ = this.makeChildGUIcontroller_
     // (lgb.chart.controller.SimulationGraphController, simDataModel);
//     
   // var chartModel_02 = new lgb.chart.model.GraphGUImodel();
   // chartModel_02.setTitle('Outside Temp');
   // chartModel_02.addVariable('y_SYS_1', 5, 30);
   // chartModel_02.makeRandomData(20);
//   
   // this.chartController02_.setChartModel(chartModel_02);
//    
//    
  // this.chartController03_ = this.makeChildGUIcontroller_
     // (lgb.chart.controller.SimulationGraphController, simDataModel);
//     
   // var chartModel_03 = new lgb.chart.model.GraphGUImodel();
   // chartModel_03.setTitle('ZN2 Heat');
   // chartModel_03.addVariable('u_ZN_5', 5, 30);
   // chartModel_03.makeRandomData(20);
//   
   // this.chartController03_.setChartModel(chartModel_03);
//    
//    
  // this.chartController04_ = this.makeChildGUIcontroller_
     // (lgb.chart.controller.SimulationGraphController, simDataModel);
//     
   // var chartModel_04 = new lgb.chart.model.GraphGUImodel();
   // chartModel_04.setTitle('ZN2 Cool');
   // chartModel_04.addVariable('u_ZN_6', 5, 30);
   // chartModel_04.makeRandomData(20);
//   
   // this.chartController04_.setChartModel(chartModel_04);
//    
//    
  // this.chartController05_ = this.makeChildGUIcontroller_
     // (lgb.chart.controller.SimulationGraphController, simDataModel);
//     
   // var chartModel_05 = new lgb.chart.model.GraphGUImodel();
   // chartModel_05.setTitle('ZN2 Heat Night');
   // chartModel_05.addVariable('u_ZN_7', 5, 30);
   // chartModel_05.makeRandomData(20);
//   
   // this.chartController05_.setChartModel(chartModel_05);
//    
//    
  // this.chartController06_ = this.makeChildGUIcontroller_
     // (lgb.chart.controller.SimulationGraphController, simDataModel);
//     
   // var chartModel_06 = new lgb.chart.model.GraphGUImodel();
   // chartModel_06.setTitle('ZN2 Cool Night');
   // chartModel_06.addVariable('u_ZN_8', 5, 30);
   // chartModel_06.makeRandomData(20);
//   
   // this.chartController06_.setChartModel(chartModel_06);
//    
// 
// };
