goog.provide('lgb.view.BasicInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.BasicInputGUI = function(dataModel) {

  this._TITLE = 'Left Panel';
  
  lgb.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.BasicInputGUI, lgb.view.BaseViewGUI);


/**
 * @public
 */
lgb.view.BasicInputGUI.prototype.init = function() {

  this.layoutID = lgb.Config.LAYOUT_ID.BasicInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('TabStripTitle');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};

  //this.inject();

};


lgb.view.BasicInputGUI.prototype.add = function(gui) {


  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title]
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.inject(contentElement);
  
};


/**
 * @public
 */
lgb.view.BasicInputGUI.prototype.inject = function(parentElement) {
  
  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();


  
};


