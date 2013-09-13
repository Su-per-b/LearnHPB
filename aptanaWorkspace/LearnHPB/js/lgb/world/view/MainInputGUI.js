goog.provide('lgb.world.view.OutputGUI');


goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');


lgb.world.view.OutputGUI = function(dataModel) {

  this._TITLE = 'Testing';
  
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.world.view.OutputGUI, lgb.gui.view.BaseViewGUI);


/**
 * @public
 */
lgb.world.view.OutputGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('mainInputGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);

  this.tabTitleMap_ = {};
  
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.world.view.OutputGUI.prototype.add = function(gui) {


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
lgb.world.view.OutputGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("padding-top","68px");

};


