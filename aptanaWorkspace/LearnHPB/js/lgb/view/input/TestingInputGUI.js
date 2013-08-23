goog.provide('lgb.view.input.TestingInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.input.TestingInputGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.view.input.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.input.TestingInputGUI, lgb.view.input.BaseViewGUI);


/**
 * @public
 */
lgb.view.input.TestingInputGUI.prototype.init = function() {

  this.layoutID = lgb.Config.LAYOUT_ID.TestingInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('testingInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.input.TestingInputGUI.prototype.add = function(gui) {


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
lgb.view.input.TestingInputGUI.prototype.inject = function(parentElement) {
  
  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();

 
};


