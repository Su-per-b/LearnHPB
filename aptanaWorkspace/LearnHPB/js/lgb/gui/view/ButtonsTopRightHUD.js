/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.ButtonsTopRightHUD');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');
goog.require('lgb.component.TabStripDataSource');
goog.require('lgb.component.TabStrip');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.ButtonsTopRightHUD = function(dataModel) {
  
  this._TITLE = "RightTop";
  lgb.gui.view.BaseGUI.call(this, dataModel, 'RightTopInputGUI');
};
goog.inherits(lgb.gui.view.ButtonsTopRightHUD, lgb.gui.view.BaseGUI);


/**
 * Initializes the View
 */
lgb.gui.view.ButtonsTopRightHUD.prototype.init = function() {
  
  // this.dataSource1 = new lgb.component.TabStripDataSource('RightTopInputGUI-tabStrip');
  // this.dataSource1.setIcon("images/tabs/optionsBtn_grid_25.png", 25, 25);
  // this.dataSource1.addTab('', '', 1);
  // this.dataSource1.addTab('', '', 2);
  // this.dataSource1.addTab('', '', 3);
  // this.dataSource1.addTab('', '', 4);
  // this.dataSource1.addTab('', '', 5);
//   
  // this.tabStrip1 = new lgb.component.TabStrip(this.dataSource1);
//   
// 
  // this.dataSource2 = new lgb.component.TabStripDataSource('RightTopInputGUI2-tabStrip');
  // this.dataSource2.setIcon("images/tabs/viewBtn_grid_25.png", 25, 25);
  // this.dataSource2.addTab('', '', 1);
  // this.dataSource2.addTab('', '', 2);
  // this.dataSource2.addTab('', '', 3);
  // this.dataSource2.addTab('', '', 4);
  // this.dataSource2.addTab('', '', 5);
//   
  // this.tabStrip2 = new lgb.component.TabStrip(this.dataSource2);
  
  
};


lgb.gui.view.ButtonsTopRightHUD.prototype.add = function(gui) {


  var title = gui.getTitle();

  var el = this.getMainElement();;
  
  gui.injectInto(el);
  
};





lgb.gui.view.ButtonsTopRightHUD.prototype.injectInto = function(parentElement) {
  
  goog.base(this,  'injectInto', parentElement);
  


};

