goog.provide('lgb.view.BuildingInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.BuildingInputGUI = function(dataModel) {

  this._TITLE = 'Building';
  
  lgb.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.BuildingInputGUI, lgb.view.BaseViewGUI);



/**
 * @public
 */
lgb.view.BuildingInputGUI.prototype.init = function() {

  this.layoutID = lgb.Config.LAYOUT_ID.BuildingInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('buildingInputGUI-tabStrip');
  this.dataSource.setIcon("images/tabs/systemBtn_grid_25.png", 25, 25);
  
  
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};



lgb.view.BuildingInputGUI.prototype.add = function(gui) {


  var title = gui.getTitle();
  
  if (undefined === title) {
    debugger;
  }

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title]
  } else {
    this.dataSource.addTab('', '<br />');
    
    contentElement = this.tabStrip1.getContentElement();
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.inject(contentElement);
  
};


/**
 * @public
 */
lgb.view.BuildingInputGUI.prototype.inject = function(parentElement) {
  
  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();

};