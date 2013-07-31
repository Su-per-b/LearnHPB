/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 	 
 	 /**
 * @author Raj Dye - raj@rajdye.com
*/

goog.provide('lgb.component.SplitPanel');
goog.require('lgb.view.BaseV');


/**
 * Html component that contains a cusmtom SplitPanel
 * @param {string} parentHtmlID The CSS id of the parent.
 * @param {string} subID The second  part fo the CSS id.
 * @param {string} title Ysed for the label of the component.
 * @constructor
 * @extends {lgb.BaseV}
 */
lgb.component.SplitPanel = function(ds) {
    
  lgb.view.BaseV.call(this);
  
  lgb.assert (ds);
  this.ds = ds;
  this.panes_ = [];
};
goog.inherits(lgb.component.SplitPanel, lgb.view.BaseV);






lgb.component.SplitPanel.prototype.makeElement = function() {


};


lgb.component.SplitPanel.prototype.getPane = function(idx) {
  
  return this.panes_[idx];
}




lgb.component.SplitPanel.prototype.getContainer = function(idx) {
  
  return this.splitterBarContainer_;
};


lgb.component.SplitPanel.prototype.onResize_ = function(event) {
  
  return this.triggerLocal(e.Resize);
  
};


lgb.component.SplitPanel.prototype.inject = function(parentElement) {

  var w = window.innerWidth;
  var h = window.innerHeight;
  
  this.leftPane_ = this.makeDiv("leftPanel");
  this.rightPane_ = this.makeDiv();
  
  this.panes_.push(this.leftPane_);
  this.panes_.push(this.rightPane_);
  
  this.splitterBarContainer_ = this.makeDiv();
  
  this.splitterBarContainer_.css({
    width : "100%",
    height : "100%",
    overflow:"hidden"
  });
  
//   
  // this.rightPane_.css({
    // width : "100%",
    // height : "100%"
  // });
//   
  // this.leftPane_.css({
    // overflow : "visible",
    // height : "auto"
  // });
  
  
  this.leftPane_.css({
    position : "fixed !important",
    position : "absolute",
    top : "0",
    right : "0",
    bottom : "0",
    left : "0",
    "overflow-y":"scroll",
    "overflow-x":"hidden",
  });
  
  
  this.splitterBarContainer_.append(this.leftPane_).append(this.rightPane_);
  this.setMainElement(this.splitterBarContainer_);
  
  goog.base(this, 'inject', parentElement);
  
  var px = String (this.ds.splitLocation) + 'px';
  
  this.splitterBarContainer_.kendoSplitter({
    panes : [{
      collapsible : true,
      size : px
    }, {
      collapsible : false
    }]
  });
  



  this.kendoSplitter1_ = this.splitterBarContainer_.data("kendoSplitter");
  this.kendoSplitter1_.bind('resize', this.d(this.onResize_));
  
};
