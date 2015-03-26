/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgbCharting.gui.view.LayoutSimplestView');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.SplitPanel');
goog.require('lgb.component.SplitPanelDataSource');
goog.require('lgb.gui.view.LayoutUtil');
goog.require('lgb.core.Config');
goog.require('lgb.gui.model.LayoutModel');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgbCharting.gui.view.LayoutSimplestView = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel, 'pageContainer', 'theBody');
  this.layoutUtils_ = [];
  
};
goog.inherits(lgbCharting.gui.view.LayoutSimplestView, lgb.gui.view.BaseGUI);



lgbCharting.gui.view.LayoutSimplestView.prototype.init = function() {
  this.bind_();
  this.inject();
};


lgbCharting.gui.view.LayoutSimplestView.prototype.bind_ = function(guiView) {


};



lgbCharting.gui.view.LayoutSimplestView.prototype.toggleVisibility = function(guiView) {
  
  guiView.isVisible_ = !guiView.isVisible_;
  var el = guiView.getMainElement();
  
  el.toggle();

};



lgbCharting.gui.view.LayoutSimplestView.prototype.add = function(guiView) {
  

  var className = guiView.getClassName();
  var el = this.getMainElement();
  guiView.injectInto(el);
  
};




lgbCharting.gui.view.LayoutSimplestView.prototype.onSplitterResize_ = function(event) {
  this.triggerLocal(e.SplitterResize);
};



//this is the root injection
lgbCharting.gui.view.LayoutSimplestView.prototype.inject = function() {

  var el = this.getMainElement();
  goog.base(this,'inject');

  

};





