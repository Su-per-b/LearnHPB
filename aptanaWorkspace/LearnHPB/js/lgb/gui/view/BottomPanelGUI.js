goog.provide('lgb.gui.view.BottomPanelGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.BottomPanelGUI = function(dataModel) {

  this._TITLE = 'BottomPanelGUI';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('bottomPanelGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);
  
};
goog.inherits(lgb.gui.view.BottomPanelGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.BottomPanelGUI.prototype.init = function() {
    this.triggerLocal(e.RequestAddToLayout, this);
    
    
};


lgb.gui.view.BottomPanelGUI.prototype.add = function(gui) {

  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_[title]) {
    contentElement = this.tabTitleMap_[title];
  } else {
    
    contentElement = this.tabStrip1.addTab(title);
    
    contentElement.css("min-height","100%");
    contentElement.css("height","100%");
    contentElement.css("overflow","none");
    
    
    this.tabTitleMap_[title] = contentElement;
  }
  
  gui.injectTo(contentElement);
  
};


/**
 * @public
 */
lgb.gui.view.BottomPanelGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("width","100%");
  el.css("min-height","100%");
  el.css("height","100%");
};


