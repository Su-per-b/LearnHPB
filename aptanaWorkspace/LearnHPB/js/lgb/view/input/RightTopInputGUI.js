/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.RightTopInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');
goog.require('lgb.component.TabStripDataSource');
goog.require('lgb.component.TabStrip');


/**
 * @constructor
 * @param {lgb.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.RightTopInputGUI = function(dataModel) {
  
  this._TITLE = "RightTop";
  this.layoutID = lgb.Config.LAYOUT_ID.RightTopInputGUI;
  
  lgb.view.input.BaseViewGUI.call(this, dataModel, 'RightTopInputGUI');
};
goog.inherits(lgb.view.input.RightTopInputGUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.RightTopInputGUI.prototype.init = function() {
  
  this.dataSource1 = new lgb.component.TabStripDataSource('RightTopInputGUI-tabStrip');
  this.dataSource1.setIcon("images/tabs/optionsBtn_grid_25.png", 25, 25);
  this.dataSource1.addTab('', '', 1);
  this.dataSource1.addTab('', '', 2);
  this.dataSource1.addTab('', '', 3);
  this.dataSource1.addTab('', '', 4);
  this.dataSource1.addTab('', '', 5);
  
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource1);
  

  this.dataSource2 = new lgb.component.TabStripDataSource('RightTopInputGUI2-tabStrip');
  this.dataSource2.setIcon("images/tabs/viewBtn_grid_25.png", 25, 25);
  this.dataSource2.addTab('', '', 1);
  this.dataSource2.addTab('', '', 2);
  this.dataSource2.addTab('', '', 3);
  this.dataSource2.addTab('', '', 4);
  this.dataSource2.addTab('', '', 5);
  
  this.tabStrip2 = new lgb.component.TabStrip(this.dataSource2);
  
  
  this.triggerLocal(e.RequestAddToLayout, this);
};




lgb.view.input.RightTopInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.RightTopInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  

  

  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();
  
  this.tabStrip2.inject(parentElement);
  this.tabStrip2.injectCss();
  
 // el.append(this.tabStrip1);
  
  return;
};

