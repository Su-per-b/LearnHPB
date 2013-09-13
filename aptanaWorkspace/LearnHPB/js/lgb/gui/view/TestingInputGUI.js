goog.provide('lgb.world.view.input.TestingInputGUI');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.world.view.input.TestingInputGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.world.view.input.TestingInputGUI, lgb.gui.view.BaseViewGUI);


/**
 * @public
 */
lgb.world.view.input.TestingInputGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('testingInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

/*
  this.tabStrip1.setOptions({
    width : "100%"
  });
*/

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.world.view.input.TestingInputGUI.prototype.add = function(gui) {


  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title]
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.world.view.input.TestingInputGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();

 
};


