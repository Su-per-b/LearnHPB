/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.chart.view.LayoutView');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.gui.model.LayoutModel');


/**
 * @constructor
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.chart.view.LayoutView = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel, 'pageContainer', 'theBody');

};
goog.inherits(lgb.chart.view.LayoutView, lgb.gui.view.BaseGUI);



lgb.chart.view.LayoutView.prototype.init = function() {

  this.inject();
};




lgb.chart.view.LayoutView.prototype.add = function(guiView) {
  
  var className = guiView.getClassName(); 

  switch(className ) {
    
    case "SimulationStateControlGUIh": {
       guiView.injectTo(this.chartTop_);
      break;
    }
    case "GraphGUI_05": {
      guiView.injectTo(this.chartBottom_);
      break;
    }
     default: {
      debugger;
    }
     
  }

      
};



  
lgb.chart.view.LayoutView.prototype.inject = function() {
  
  goog.base(this,'inject');
  
  this.chartTop_ = this.makeDiv('chartTop');
  this.chartBottom_ = this.makeDiv('chartBottom');
  
  this.chartTop_.css({
    width : "100%",
    height : "68px",
    background:"#ffffaa"
  });
  
  this.chartBottom_.css({
    width : "100%",
    background:"#fff"
  });
  
    this.append(this.chartTop_);
    this.append(this.chartBottom_);
  
};



lgb.chart.view.LayoutView.prototype.calculateLayout = function(windowDimensions) {
  
  //this.splitPanelHorizontal_.calculateLayout();
  
  //this.each(this.layoutUtils_, this.calculateOneLayout);
};



// lgb.chart.view.LayoutView.prototype.inject = function() {
// 
  // goog.base(this,'inject');
// 
  // //this.container_ = this.makeDiv();
  // //this.append("<p>This is a test</p>");
//   
  // return;
//   
// /*
  // this.container_.css({
    // width : "100%",
    // height : "95%"
  // });*/
// 
// };
// 




