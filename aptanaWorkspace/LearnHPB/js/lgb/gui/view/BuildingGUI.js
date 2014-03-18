goog.provide('lgb.gui.view.BuildingGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.BuildingGUI = function(dataModel) {

  this._TITLE = 'Building';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);


};
goog.inherits(lgb.gui.view.BuildingGUI, lgb.gui.view.BaseGUI);




lgb.gui.view.BuildingGUI.prototype.init = function() {
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('buildingInputGUI-tabStrip');
  this.dataSource.setIcon("images/tabs/systemBtn_grid_25.png", 25, 25);
  
  
  this.tabStrip = new lgb.component.TabStrip(this.dataSource);
};



lgb.gui.view.BuildingGUI.prototype.add = function(gui) {


  var title = gui.getTitle();

  if (undefined === title) {
    debugger;
  }

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title];
  } else {
    this.dataSource.addTab('', '<br />');
    
    contentElement = this.tabStrip.getContentElement();
    this.tabTitleMap_[title] = contentElement;
  }
  
  
  gui.injectInto(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.BuildingGUI.prototype.injectInto = function(parentElement) {
  
  this.tabStrip.injectInto(parentElement);
  this.tabStrip.injectCss();
  
  
};

