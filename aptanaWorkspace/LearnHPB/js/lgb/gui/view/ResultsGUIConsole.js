goog.provide('lgb.gui.view.ResultsGUIConsole');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


lgb.gui.view.ResultsGUIConsole = function(dataModel) {

  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('ResultsGUIConsole-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);
  
};
goog.inherits(lgb.gui.view.ResultsGUIConsole, lgb.gui.view.BaseViewGUI);



/**
 * @public
 */
lgb.gui.view.ResultsGUIConsole.prototype.init = function() {


    this.triggerLocal(e.RequestAddToLayout, this);
};

