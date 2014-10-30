/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgbCharting.gui.view.LayoutSimpleView');

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
lgbCharting.gui.view.LayoutSimpleView = function(dataModel) {

  lgb.gui.view.BaseGUI.call(this, dataModel, 'pageContainer', 'theBody');
  this.layoutUtils_ = [];
  
};
goog.inherits(lgbCharting.gui.view.LayoutSimpleView, lgb.gui.view.BaseGUI);



lgbCharting.gui.view.LayoutSimpleView.prototype.init = function() {

  
  this.splitPanelVerticalDS_ = new lgb.component.SplitPanelDataSource();

  this.splitPanelVerticalDS_.panes =  [{
      collapsible : false
    }, {
      size:"900px",
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


lgbCharting.gui.view.LayoutSimpleView.prototype.bind_ = function(guiView) {
  
  this.listenTo(this.splitPanelVerticalDS_, e.Resize, this.onSplitterResize_);
  
};





lgbCharting.gui.view.LayoutSimpleView.prototype.toggleVisibility = function(guiView) {
  
  guiView.isVisible_ = !guiView.isVisible_;
  var el = guiView.getMainElement();
  
  el.toggle();

};



lgbCharting.gui.view.LayoutSimpleView.prototype.add = function(guiView) {
  

  var className = guiView.getClassName();

  switch(className ) {
    

    case "BottomPanelGUI":
      guiView.injectInto(this.bottomPanel_);
      break;


    default:
      debugger;
  }


};




lgbCharting.gui.view.LayoutSimpleView.prototype.onSplitterResize_ = function(event) {
  this.triggerLocal(e.SplitterResize);
};





//this is the root injection
lgbCharting.gui.view.LayoutSimpleView.prototype.inject = function() {

  var el = this.getMainElement();


  goog.base(this,'inject');

  
  this.splitPanelVertical_.injectInto(el);
  

  this.topPanel_ = this.splitPanelVertical_.getPane(0);
  this.bottomPanel_ = this.splitPanelVertical_.getPane(1);

  
  this.viewportTop_ = this.makeDiv('viewportTop');
  this.topPanel_.append(this.viewportTop_);

  this.viewportTop_.css({
    width : "100%",
    height : "64px",
    background:"transparent"
  });
  
  

};





