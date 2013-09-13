goog.provide('lgb.gui.view.LeftPanelGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.LeftPanelGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.LeftPanelGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.LeftPanelGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('mainInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);


  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.gui.view.LeftPanelGUI.prototype.add = function(gui) {


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
lgb.gui.view.LeftPanelGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("padding-top","68px");

};


