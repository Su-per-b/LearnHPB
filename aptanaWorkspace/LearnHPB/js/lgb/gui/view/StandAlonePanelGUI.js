goog.provide('lgb.gui.view.StandAlonePanelGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');

lgb.gui.view.StandAlonePanelGUI = function(dataModel) {

  this._TITLE = 'StandAlonePanelGUI';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);

  
};
goog.inherits(lgb.gui.view.StandAlonePanelGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.StandAlonePanelGUI.prototype.init = function() {
  
  this.tabTitleMap_ = {};
  
  this.dataSource = new lgb.component.TabStripDataSource('bottomPanelGUI-tabStrip');
  this.tabStrip1 = new lgb.component.TabStrip(this.dataSource);
    
};


lgb.gui.view.StandAlonePanelGUI.prototype.add = function(gui) {

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
lgb.gui.view.StandAlonePanelGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip1.injectTo(parentElement);
  this.tabStrip1.injectCss();
  
  var el = this.tabStrip1.getMainElement();
  el.css("width","100%");
  el.css("min-height","100%");
  el.css("height","100%");
};


