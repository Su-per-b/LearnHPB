goog.provide('lgb.gui.view.TestGUI');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.TabStrip');
goog.require('lgb.component.TabStripDataSource');
goog.require('lgb.core.Event');


lgb.gui.view.TestGUI = function(dataModel) {

  this._TITLE = 'Test';
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.TestGUI, lgb.gui.view.BaseGUI);


/**
 * @public
 */
lgb.gui.view.TestGUI.prototype.init = function() {

  this.dataSource = new lgb.component.TabStripDataSource('testingInputGUI-tabStrip');
  this.tabStrip = new lgb.component.TabStrip(this.dataSource);

  this.tabTitleMap_ = {};
  this.tabViewPointMap_ = {};
  this.tab2guiMap_ = {};
  
  this.bind_();
  

};


lgb.gui.view.TestGUI.prototype.bind_ = function() {
  
  this.listenTo(this.tabStrip, e.Select, this.onSelect);
  
};


lgb.gui.view.TestGUI.prototype.onSelect = function(event) {

  var title = event.payload.textContent;
  var gui = this.tab2guiMap_[title];
  
  if (null == gui) {
    //debugger;
  } else {
    gui.gotoViewPoint('MainViewPoint');
  }


};


lgb.gui.view.TestGUI.prototype.add = function(gui) {

  var title = gui.getTitle();

  var contentElement;
  
  if (this.tabTitleMap_.hasOwnProperty(title)) {
    debugger;
  } else {
    contentElement = this.tabStrip.addTab(title);
    this.tabTitleMap_[title] = contentElement;
    this.tab2guiMap_[title] = gui;
  }
  
  gui.injectTo(contentElement);
  
  
};


/**
 * @public
 */
lgb.gui.view.TestGUI.prototype.injectTo = function(parentElement) {
  
  this.tabStrip.injectTo(parentElement);
  this.tabStrip.injectCss();

 
};


