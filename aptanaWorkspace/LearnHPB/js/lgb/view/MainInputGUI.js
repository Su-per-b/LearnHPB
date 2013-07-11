goog.provide('lgb.view.MainInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.view.MainInputGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.MainInputGUI, lgb.view.BaseViewGUI);


/**
 * @public
 */
lgb.view.MainInputGUI.prototype.init = function() {

  this.layoutID = lgb.Config.LAYOUT_ID.MainInputGUI;
    
  this.dataSource = new lgb.component.TabStripDataSource('mainInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabStrip1.setOptions({
    width : "100%"
  });

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.MainInputGUI.prototype.add = function(gui) {


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
lgb.view.MainInputGUI.prototype.inject = function(parentElement) {
  
  this.tabStrip1.inject(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("padding-top","68px");

};


