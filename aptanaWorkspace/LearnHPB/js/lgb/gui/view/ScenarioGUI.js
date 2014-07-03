goog.provide('lgb.gui.view.ScenarioGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.ScenarioGUI = function(dataModel) {

  this._TITLE = 'Scenario';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.ScenarioGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.ScenarioGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('scenarioInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabTitleMap_ = {};

  this.showPopup_();
};


lgb.gui.view.ScenarioGUI.prototype.add = function(gui) {

  var el = this.getMainElement();
  gui.appendTo(el);
  
};









