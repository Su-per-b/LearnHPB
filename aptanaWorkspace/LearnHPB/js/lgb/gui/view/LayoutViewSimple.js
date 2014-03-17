/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.gui.view.LayoutViewSimple');

goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.component.SplitPanel');
goog.require('lgb.component.SplitPanelDataSource');
goog.require('lgb.gui.view.LayoutUtil');
goog.require('lgb.core.Config');
goog.require('lgb.gui.model.LayoutModel');




/**
 * @constructor
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.gui.view.LayoutViewSimple = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel, 'pageContainer', 'theBody');
  this.layoutUtils_ = [];
  
};
goog.inherits(lgb.gui.view.LayoutViewSimple, lgb.gui.view.BaseGUI);



lgb.gui.view.LayoutViewSimple.prototype.init = function() {

  this.splitPanelHorizontalDS_ = new lgb.component.SplitPanelDataSource();
  
  this.splitPanelHorizontalDS_.panes =  [{
      collapsible : true,
      size:"340px"
    }, {
      collapsible : false
    }];
    
  this.splitPanelHorizontalDS_.splitsAlongHorizontalAxis = true;
  this.splitPanelHorizontal_ = new lgb.component.SplitPanel(this.splitPanelHorizontalDS_);
  
  this.splitPanelHorizontal_.paneOneCss["overflow-y"] = "hidden";
  this.splitPanelHorizontal_.paneOneCss["height"] = "100%";
  
  
  this.splitPanelVerticalDS_ = new lgb.component.SplitPanelDataSource();

  this.splitPanelVerticalDS_.panes =  [{
      collapsible : false
    }, {
      size:"400px",
      collapsible : true
    }];
    
    
  this.splitPanelVerticalDS_.splitsAlongHorizontalAxis = false;
  this.splitPanelVertical_ = new lgb.component.SplitPanel(this.splitPanelVerticalDS_);
  
  this.splitPanelVertical_.paneOneCss["overflow-y"] = "hidden";
  
  this.splitPanelVertical_.paneTwoCss["overflow-y"] = "hidden";
  this.splitPanelVertical_.paneTwoCss["overflow-x"] = "hidden";
  
  this.bind_();
  this.inject();
};


lgb.gui.view.LayoutViewSimple.prototype.bind_ = function(guiView) {
  
  this.listenTo(this.splitPanelHorizontal_, e.Resize, this.onSplitterResizeHorizontal_);
  this.listenTo(this.splitPanelVertical_, e.Resize, this.onSplitterResizeVertical_);
  // this.listenForChange_('add');
  
};





lgb.gui.view.LayoutViewSimple.prototype.toggleVisibility = function(guiView) {
  
  guiView.isVisible_ = !guiView.isVisible_;
  var el = guiView.getMainElement();
  
  el.toggle();

};



lgb.gui.view.LayoutViewSimple.prototype.add = function(guiView) {
  

  var className = guiView.getClassName();

  switch(className ) {
    
    case "LeftPanelGUISimple":
      guiView.injectTo(this.leftPanel_);
      break;

    case "BottomPanelGUI":
      var util = new lgb.gui.view.LayoutUtil(guiView);
      
      guiView.injectTo(this.bottomRightPanel_);
      break;

    default:
      debugger;
  }


  
};




lgb.gui.view.LayoutViewSimple.prototype.onSplitterResizeVertical_ = function(event) {
  this.triggerLocal(e.LayoutChange);
};


lgb.gui.view.LayoutViewSimple.prototype.onSplitterResizeHorizontal_ = function(event) {
  this.triggerLocal(e.LayoutChange);
};

lgb.gui.view.LayoutViewSimple.prototype.calculateLayout = function(windowDimensions) {
  
  //this.splitPanelHorizontal_.calculateLayout();
  
  //this.each(this.layoutUtils_, this.calculateOneLayout);
};

lgb.gui.view.LayoutViewSimple.prototype.calculateOneLayout = function(layoutUtil) {
  layoutUtil.tweenToPosition();
};


lgb.gui.view.LayoutViewSimple.prototype.inject = function() {


  var el = this.getMainElement();
  el.css({
      top:"0px",
      left:"0px",
      position:"absolute",
      width:"100%",
      height:"100%",
      overflow:"hidden",
      "background-image": "url(images/laura/back-top.jpg)",
      "background-repeat": "repeat-x"
    });

  goog.base(this,'inject');

  
  this.splitPanelHorizontal_.injectTo(el);
  
  this.leftPanel_ = this.splitPanelHorizontal_.getPane(0);
  this.rightPanel_ = this.splitPanelHorizontal_.getPane(1);

  this.splitPanelVertical_.injectTo(this.rightPanel_);
  this.topRightPanel_ = this.splitPanelVertical_.getPane(0);
  this.bottomRightPanel_ = this.splitPanelVertical_.getPane(1);

  this.webGLcontainer_ = this.makeDiv(lgb.core.Config.WEBGL_CONTAINER_DIV_ID);
  
  this.viewportTop_ = this.makeDiv('viewportTop');
  
  this.topRightPanel_.append(this.viewportTop_);
  this.topRightPanel_.append(this.webGLcontainer_);

  this.webGLcontainer_.css({
    width : "100%",
    height : "95%"
  });
  

  this.viewportTop_.css({
    width : "100%",
    height : "32px",
    background:"transparent"
  });
  
  
  
  
  



};





