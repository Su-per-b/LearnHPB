goog.provide('lgb.view.input.MainInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.input.MainInputGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.view.input.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.input.MainInputGUI, lgb.view.input.BaseViewGUI);


/**
 * @public
 */
lgb.view.input.MainInputGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('mainInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.input.MainInputGUI.prototype.add = function(gui) {


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
lgb.view.input.MainInputGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("padding-top","68px");

};


