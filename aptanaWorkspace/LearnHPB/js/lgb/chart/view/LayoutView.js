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

  // this.bind_();
  this.inject();
};


// lgb.chart.view.LayoutView.prototype.bind_ = function(guiView) {
//   
  // this.listenForChange_('add');
//   
// };



// 
// lgb.chart.view.LayoutView.prototype.onChange_add_ = function(value) {
//   
  // this.add(value);
// };





lgb.chart.view.LayoutView.prototype.add = function(guiView) {
  
  var className = guiView.getClassName();

  var el = this.getMainElement();
  guiView.injectTo(el);
      
  
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




