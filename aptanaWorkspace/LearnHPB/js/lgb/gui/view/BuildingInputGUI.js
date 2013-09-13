goog.provide('lgb.gui.view.BuildingInputGUI');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.BuildingInputGUI = function(dataModel) {

  this._TITLE = 'Building';
  
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('buildingInputGUI-tabStrip');
  this.dataSource.setIcon("images/tabs/systemBtn_grid_25.png", 25, 25);
  
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

};
goog.inherits(lgb.gui.view.BuildingInputGUI, lgb.gui.view.BaseViewGUI);



/**
 * @public
 */
lgb.gui.view.BuildingInputGUI.prototype.init = function() {
  

  // this.tabStrip1.setOptions({
    // width : "100%"
  // });
  
  this.triggerLocal(e.RequestAddToParentGUI);
};



lgb.gui.view.BuildingInputGUI.prototype.add = function(gui) {


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
lgb.gui.view.BuildingInputGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  // var el = this.tabStrip1.getMainElement();
  // el.css("width","100%");
  // el.css("min-height","100%");
  
};

