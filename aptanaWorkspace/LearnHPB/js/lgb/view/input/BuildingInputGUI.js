goog.provide('lgb.view.input.BuildingInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.input.BuildingInputGUI = function(dataModel) {

  this._TITLE = 'Building';
  
  lgb.view.BaseViewGUI.call(this, dataModel);
  
  this.tabTitleMap_ = {};
  
  this.layoutID = lgb.Config.LAYOUT_ID.BuildingInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('buildingInputGUI-tabStrip');
  this.dataSource.setIcon("images/tabs/systemBtn_grid_25.png", 25, 25);
  
  
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

};
goog.inherits(lgb.view.input.BuildingInputGUI, lgb.view.BaseViewGUI);





/**
 * @public
 */
lgb.view.input.BuildingInputGUI.prototype.init = function() {
  

  this.tabStrip1.setOptions({
    width : "100%"
  });
  
  this.triggerLocal(e.RequestAddToParentGUI);
};



lgb.view.input.BuildingInputGUI.prototype.add = function(gui) {


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
  
  //this.tabStrip1.injectOneCss();
  
  gui.inject(contentElement);
  
};


/**
 * @public
 */
lgb.view.input.BuildingInputGUI.prototype.inject = function(parentElement) {
  
  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();

};


lgb.view.input.BuildingInputGUI.prototype.onDataModelChanged = function(tab) {
  



  return;
    
};