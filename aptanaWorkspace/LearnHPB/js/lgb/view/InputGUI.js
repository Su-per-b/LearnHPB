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

  return;
};

lgb.view.InputGUI.prototype.addGUIview = function(gui) {

  var title = gui.getTitle();

  var contentElement = this.tabStrip1.addTab(title);
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

