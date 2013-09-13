goog.provide('lgb.gui.view.BuildingGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.BuildingGUI = function(dataModel) {


  lgb.gui.view.BaseGUI.call(this, dataModel);
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('buildingInputGUI-tabStrip');
  this.dataSource.setIcon("images/tabs/systemBtn_grid_25.png", 25, 25);
  
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

};
goog.inherits(lgb.gui.view.BuildingGUI, lgb.gui.view.BaseGUI);



/**
 * @public
 */
lgb.gui.view.BuildingGUI.prototype.init = function() {
  
  this.triggerLocal(e.RequestAddToParentGUI);
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
    
    contentElement = this.tabStrip1.getContentElement();
    this.tabTitleMap_[title] = contentElement;
  }
  
  //this.tabStrip1.injectOneCss();
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.BuildingGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  // var el = this.tabStrip1.getMainElement();
  // el.css("width","100%");
  // el.css("min-height","100%");
  
};

