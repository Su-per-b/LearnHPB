goog.provide('lgb.view.TestingInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.TestingInputGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.TestingInputGUI, lgb.view.BaseViewGUI);


/**
 * @public
 */
lgb.view.TestingInputGUI.prototype.init = function() {

  this.layoutID = lgb.Config.LAYOUT_ID.TestingInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('TabStripTitle');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};

};


lgb.view.TestingInputGUI.prototype.add = function(gui) {


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
lgb.view.TestingInputGUI.prototype.inject = function(parentElement) {
  
  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();


  
};


