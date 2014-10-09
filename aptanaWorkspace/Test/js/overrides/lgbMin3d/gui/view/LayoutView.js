/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgbMin3d.gui.view.LayoutView');

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
lgbMin3d.gui.view.LayoutView = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel, 'pageContainer', 'theBody');
  this.layoutUtils_ = [];
  
};
goog.inherits(lgbMin3d.gui.view.LayoutView, lgb.gui.view.BaseGUI);



lgbMin3d.gui.view.LayoutView.prototype.init = function() {


  
  this.bind_();
  this.inject();
};


lgbMin3d.gui.view.LayoutView.prototype.bind_ = function(guiView) {
  

  
};




lgbMin3d.gui.view.LayoutView.prototype.toggleVisibility = function(guiView) {
  
  guiView.isVisible_ = !guiView.isVisible_;
  var el = guiView.getMainElement();
  
  el.toggle();

};



lgbMin3d.gui.view.LayoutView.prototype.add = function(guiView) {
  

  var className = guiView.getClassName();
  debugger


};


lgbMin3d.gui.view.LayoutView.prototype.calculateLayout = function(windowDimensions) {
  
  //this.splitPanelHorizontal_.calculateLayout();
  
  this.each(this.layoutUtils_, this.calculateOneLayout);
};

lgbMin3d.gui.view.LayoutView.prototype.calculateOneLayout = function(layoutUtil) {
  layoutUtil.tweenToPosition();
};


lgbMin3d.gui.view.LayoutView.prototype.inject = function() {

  this.inject_();

  this.webGLcontainer_ = this.makeDiv(lgb.core.Config.WEBGL_CONTAINER_DIV_ID);
  

  this.webGLcontainer_.css({
    width : "100%",
    height : "100%"
  });
  
  this.append(this.webGLcontainer_);


};





