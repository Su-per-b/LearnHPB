/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.LayoutView');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.component.SplitPanel');
goog.require('lgb.component.SplitPanelDataSource');
goog.require('lgb.view.LayoutUtil');
goog.require('lgb.Config');





/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.LayoutView = function() {

  lgb.view.BaseViewGUI.call(this, null, 'pageContainer', 'theBody');

  this.parentMap = [];
  this.layoutUtils_ = [];
  
};
goog.inherits(lgb.view.LayoutView, lgb.view.BaseViewGUI);

/**
 * @private
 */
lgb.view.LayoutView.prototype.init = function() {

  this.splitPanelDS_ = new lgb.component.SplitPanelDataSource();
  this.splitPanelDS_.splitLocation = 250;
  
  this.splitPanel_ = new lgb.component.SplitPanel(this.splitPanelDS_);
  
  this.bind_();
  
  this.inject();


};


lgb.view.LayoutView.prototype.bind_ = function(guiView) {
  
  this.listenTo(this.splitPanel_, e.Resize, this.onSplitter1Resize_);
  
};



lgb.view.LayoutView.prototype.add = function(guiView) {
  
  var parent;
  var LAYOUT_ID = lgb.Config.LAYOUT_ID;
    
  if (null == guiView.layoutID) {
    debugger;
  } else {
    parent = this.parentMap[guiView.layoutID];
  }

  
  switch(guiView.layoutID )
  {
  case LAYOUT_ID.TopMenu:
      var el = guiView.getMainElement();
      
      el.css("z-index",100); 
      el.css("position","absolute"); 
      guiView.inject(parent);
      

      break;
      
  case LAYOUT_ID.PropertiesButton:
      this.propertiesButton_ = guiView;
      
      guiView.inject(parent);
      

      var util = new lgb.view.LayoutUtil(guiView);
      
      util.alignHorizontal(lgb.view.LayoutUtil.ALIGN.Right, 6);
      util.show();
      
      this.layoutUtils_.push(util);
      
      break;
  case LAYOUT_ID.TitleBar:

      guiView.inject(parent);
      
      var util = new lgb.view.LayoutUtil(guiView);
      util.alignHorizontal(lgb.view.LayoutUtil.ALIGN.Right, 60);
      util.show();
      
      this.layoutUtils_.push(util);
      
      break;
  case LAYOUT_ID.PropertiesView:

      var el = guiView.getMainElement();
      
      el.css("z-index",100); 
      guiView.inject(parent);
      
      break;
    
  default:
      guiView.inject(parent);
  }
  
};




lgb.view.LayoutView.prototype.onSplitter1Resize_ = function(event) {
  
  this.triggerLocal(e.LayoutChange);
};

lgb.view.LayoutView.prototype.calculateLayout = function(event) {
  
  this.each(this.layoutUtils_, this.calculateOneLayout);
   
};

lgb.view.LayoutView.prototype.calculateOneLayout = function(layoutUtil) {
  
  layoutUtil.tweenToPosition();
   
};


lgb.view.LayoutView.prototype.inject = function() {


  
  goog.base(this,'inject');

  this.splitPanel_.inject(this.getMainElement());
  
  this.leftPanel_ = this.splitPanel_.getPane(0);
  this.rightPanel_ = this.splitPanel_.getPane(1);
  
  
  this.webGLcanvas_ = this.makeDiv('webGLcanvas');
  
  this.rightPanel_.append(this.webGLcanvas_);
  
  var ID = lgb.Config.LAYOUT_ID;
  
  this.parentMap[ID.TitleBar] = this.webGLcanvas_;
  this.parentMap[ID.TopMenu] = this.webGLcanvas_;
 // this.parentMap[ID.ViewPoints] = this.leftPanel_;
 // this.parentMap[ID.Visibility] = this.leftPanel_;
  //this.parentMap[ID.Airflow] = this.leftPanel_;
  this.parentMap[ID.PropertiesButton] = this.webGLcanvas_;
  this.parentMap[ID.PropertiesView] = this.webGLcanvas_;

  
  
  this.webGLcanvas_.css({
    width : "100%",
    height : "100%"
  });
  

  
  return;
  
};






