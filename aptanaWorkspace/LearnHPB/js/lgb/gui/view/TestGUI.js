goog.provide('lgb.gui.view.TestGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.TestGUI = function(dataModel) {

  this._TITLE = 'Test';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.TestGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.TestGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('testingInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);


  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.gui.view.TestGUI.prototype.add = function(gui) {


  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title];
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.TestGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();

 
};


