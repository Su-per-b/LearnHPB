/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 

goog.provide('lgb.chart.controller.GraphController');

goog.require('lgb.core.BaseController');
goog.require('lgb.chart.view.GraphGUI_01');
goog.require('lgb.chart.view.GraphGUI_02');
goog.require('lgb.chart.view.GraphGUI_03');
goog.require('lgb.chart.view.GraphGUI_04');
goog.require('lgb.chart.view.GraphGUI_05');
goog.require('lgb.chart.model.GraphGUImodel');


/**
 * MVC controller for the App
 * @constructor
 * @extends lgb.core.BaseController
 */
lgb.chart.controller.GraphController = function() {
  
  lgb.core.BaseController.call(this);
  

};
goog.inherits(lgb.chart.controller.GraphController, lgb.core.BaseController);




lgb.chart.controller.GraphController.prototype.init = function(simMainController) {
  
  this.dataModel = simMainController.getDataModel();
          
  switch (lgb.chart.controller.GraphController.versionNumber) {
    case 1 : {
      this.guiView = new lgb.chart.view.GraphGUI_01 (this.dataModel);
      break;
    }
    case 2 : {
      this.guiView = new lgb.chart.view.GraphGUI_02 (this.dataModel);
      break;
    }
    case 3 : {
      this.dataModel = new lgb.chart.model.GraphGUImodel();
      this.guiView = new lgb.chart.view.GraphGUI_03 (this.dataModel);
      break;
    }
    case 4 : {
      this.guiView = new lgb.chart.view.GraphGUI_04 (this.dataModel);
      this.guiView.chartModel = new lgb.chart.model.GraphGUImodel();
      break;
    }
    case 5 : {
      
      var chartModel = new lgb.chart.model.GraphGUImodel();
      this.guiView = new lgb.chart.view.GraphGUI_05 (chartModel);
       
      break;
    }
    default : {
      debugger;
    }
    
  }

  this.triggerGUI();
  
};






