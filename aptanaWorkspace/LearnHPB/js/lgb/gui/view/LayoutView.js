/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.gui.view.LayoutView');

goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.component.SplitPanel');
goog.require('lgb.component.SplitPanelDataSource');
goog.require('lgb.view.LayoutUtil');
goog.require('lgb.Config');
goog.require('lgb.gui.model.LayoutModel');




/**
 * @constructor
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.gui.view.LayoutView = function(dataModel) {

  lgb.gui.view.BaseViewGUI.call(this, dataModel, 'pageContainer', 'theBody');
  this.layoutUtils_ = [];
  
};
goog.inherits(lgb.gui.view.LayoutView, lgb.gui.view.BaseViewGUI);



lgb.gui.view.LayoutView.prototype.init = function() {

  this.splitPanelHorizontalDS_ = new lgb.component.SplitPanelDataSource();
  
  this.splitPanelHorizontalDS_.panes =  [{
      collapsible : true,
      size:"380px"
    }, {
      collapsible : false
    }];
    
  this.splitPanelHorizontalDS_.splitsAlongHorizontalAxis = true;
  this.splitPanelHorizontal_ = new lgb.component.SplitPanel(this.splitPanelHorizontalDS_);
  
  
  this.splitPanelVerticalDS_ = new lgb.component.SplitPanelDataSource();
  

  this.splitPanelVerticalDS_.panes =  [{
      collapsible : false,
    }, {
      size:"200px",
      collapsible : true
    }];
    
    
  this.splitPanelVerticalDS_.splitsAlongHorizontalAxis = false;
  this.splitPanelVertical_ = new lgb.component.SplitPanel(this.splitPanelVerticalDS_);
  
  this.bind_();
  this.inject();
};


lgb.gui.view.LayoutView.prototype.bind_ = function(guiView) {
  
  this.listenTo(this.splitPanelHorizontal_, e.Resize, this.onSplitterResize_);
  this.listenTo(this.splitPanelVertical_, e.Resize, this.onSplitterResize_);
  this.listenForChange_('add');
  
};




lgb.gui.view.LayoutView.prototype.onChange_add_ = function(value) {
  
  this.add(value);
};




lgb.gui.view.LayoutView.prototype.toggleVisibility = function(guiView) {
  
  guiView.isVisible_ = !guiView.isVisible_;
  var el = guiView.getMainElement();
  
  el.toggle();

};



lgb.gui.view.LayoutView.prototype.add = function(guiView) {
  

 
  var className = guiView.getClassName();

  switch(className ) {
    case "TopMenuGUI":
      var el = guiView.getMainElement();

      el.css("z-index", 100);
      el.css("position", "absolute");
      guiView.injectTo(this.viewportTop_);

      break;

    case "PropertiesButtonView":
      this.propertiesButton_ = guiView;

      guiView.injectTo(this.webGLcanvas_);

      var util = new lgb.view.LayoutUtil(guiView);

      util.alignHorizontal(lgb.view.LayoutUtil.ALIGN.Right, 6);
      util.show();

      this.layoutUtils_.push(util);

      break;
    case "SimulationButtonView":
      this.simulationButton_ = guiView;

      guiView.injectTo(this.webGLcanvas_);
      var util = new lgb.view.LayoutUtil(guiView);

      util.alignHorizontal(lgb.view.LayoutUtil.ALIGN.Right, 43);
      util.show();

      this.layoutUtils_.push(util);

      break;
    case "TitleBarView":

      guiView.injectTo(this.leftPanel_);

      var util = new lgb.view.LayoutUtil(guiView);
      util.alignHorizontal(lgb.view.LayoutUtil.ALIGN.Left, 5);
      util.show();

      this.layoutUtils_.push(util);

      break;
    case "RightTopInputGUI":
      guiView.injectTo(this.viewportTop_);
      break;
    case "MainInputGUI":
      guiView.injectTo(this.leftPanel_);
      break;
    case "SimulationView":
      guiView.injectTo(this.webGLcanvas_);
      break;
    case "PropertiesView":
      guiView.injectTo(this.webGLcanvas_);
      break;
    case "TestingInputGUI":
      guiView.injectTo(this.leftPanel_);
      break;
    case "ResultsGUI":
    
      var util = new lgb.view.LayoutUtil(guiView);
      
      guiView.injectTo(this.bottomRightPanel_);
      break;

    default:
      debugger;
  }


  
};


lgb.gui.view.LayoutView.prototype.onSplitterResize_ = function(event) {
  this.triggerLocal(e.LayoutChange);
};

lgb.gui.view.LayoutView.prototype.calculateLayout = function(windowDimensions) {
  

  this.each(this.layoutUtils_, this.calculateOneLayout);
};

lgb.gui.view.LayoutView.prototype.calculateOneLayout = function(layoutUtil) {
  layoutUtil.tweenToPosition();
};


lgb.gui.view.LayoutView.prototype.inject = function() {

  goog.base(this,'inject');

  this.splitPanelHorizontal_.injectTo(this.getMainElement());
  this.leftPanel_ = this.splitPanelHorizontal_.getPane(0);
  this.rightPanel_ = this.splitPanelHorizontal_.getPane(1);
  


  this.splitPanelVertical_.injectTo(this.rightPanel_);
  this.topRightPanel_ = this.splitPanelVertical_.getPane(0);
  this.bottomRightPanel_ = this.splitPanelVertical_.getPane(1);
  


  this.webGLcanvas_ = this.makeDiv('webGLcanvas');
  this.viewportTop_ = this.makeDiv('viewportTop');
  
  this.topRightPanel_.append(this.viewportTop_);
  this.topRightPanel_.append(this.webGLcanvas_);


  this.webGLcanvas_.css({
    width : "100%",
    height : "95%"
  });
  

  this.viewportTop_.css({
    width : "100%",
    height : "32px",
    background:"#fafafa"
  });
  


};





