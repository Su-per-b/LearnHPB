goog.provide('lgb.view.InputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.InputGUI = function(dataModel, htmlID, parentHtmlID) {

  lgb.view.BaseViewGUI.call(this, dataModel, htmlID, parentHtmlID);

};
goog.inherits(lgb.view.InputGUI, lgb.view.BaseViewGUI);

/**
 * @public
 */
lgb.view.InputGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('TabStripTitle', this.parentHtmlID, 'leftpanel-tabStrip');

  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.injectHtml();
  this.injectCss();

  this.tabTitleMap_ = {};
  return;
};

lgb.view.InputGUI.prototype.add = function(gui) {

  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    
    contentElement = this.tabTitleMap_[title]
    
  } else {
    contentElement = this.tabStrip1.addTab(title);
    this.tabTitleMap_[title] = contentElement;
  }
  
  
  gui.injectMainElement(contentElement);
  
  
}
/**
 * @public
 */
lgb.view.InputGUI.prototype.injectHtml = function() {
  this.tabStrip1.injectHtml();
};

/**
 * @public
 */
lgb.view.InputGUI.prototype.injectCss = function() {
  this.tabStrip1.injectCss();
};

