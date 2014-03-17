/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.SplitPanel');
goog.require('lgb.world.view.BaseV');


/**
 * Html component that contains a cusmtom SplitPanel
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed for the label of the component.
 * @constructor
 * @extends {lgb.BaseV}
 */
lgb.component.SplitPanel = function(ds) {
    
  lgb.world.view.BaseV.call(this);
  
  lgb.assert (ds);
  this.ds = ds;
  this.panes_ = [];
  
  this.splitterBarContainerCss = {
    width : "100%",
    height : "100%",
    overflow:"hidden",
    "background":"transparent"
  };
  
  
  this.paneOneCss = 
  {
    position : "fixed !important",
    position : "absolute",
    top : "0",
    right : "0",
    bottom : "0",
    left : "0",
    
    "overflow-y":"scroll",
    "overflow-x":"hidden"
  };
  
  this.paneTwoCss = 
  {

  };
  
  
  
};
goog.inherits(lgb.component.SplitPanel, lgb.world.view.BaseV);






lgb.component.SplitPanel.prototype.makeElement = function() {


};


lgb.component.SplitPanel.prototype.getPane = function(idx) {
  
  return this.panes_[idx];
};




lgb.component.SplitPanel.prototype.getContainer = function(idx) {
  
  return this.splitterBarContainer_;
};


lgb.component.SplitPanel.prototype.onResize_ = function(event) {
  
  return this.triggerLocal(e.Resize);
  
};


lgb.component.SplitPanel.prototype.injectTo = function(parentElement) {


  
  this.paneOne_ = this.makeDiv();
  this.paneTwo_ = this.makeDiv();
  
  this.panes_.push(this.paneOne_);
  this.panes_.push(this.paneTwo_);
  
  this.splitterBarContainer_ = this.makeDiv();
  
  this.splitterBarContainer_.css(this.splitterBarContainerCss);
  this.paneOne_.css(this.paneOneCss);
  this.paneTwo_.css(this.paneTwoCss);
  
  
  
  
  this.splitterBarContainer_.append(this.paneOne_).append(this.paneTwo_);
  this.setMainElement(this.splitterBarContainer_);
  
  goog.base(this, 'injectTo', parentElement);
  
  var theOptions = {panes :  this.ds.panes};


  if (this.ds.splitsAlongHorizontalAxis) {
    theOptions.orientation = 'horizontal';
  } else {
    theOptions.orientation = 'vertical';
  }
  
  this.splitterBarContainer_.kendoSplitter(theOptions);
  
  this.kendoSplitter_ = this.splitterBarContainer_.data("kendoSplitter");
  this.kendoSplitter_.bind('resize', this.d(this.onResize_));
  
};
