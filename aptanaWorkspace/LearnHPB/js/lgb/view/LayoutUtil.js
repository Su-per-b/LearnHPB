/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.LayoutUtil');

goog.require('lgb.view.BaseViewGUI');



lgb.view.LayoutUtil = function(guiView) {
  
  this.guiView_ = guiView;
  this.element_ = guiView.getMainElement();

  lgb.controller.BaseController.call(this);

};
goog.inherits(lgb.view.LayoutUtil, lgb.view.BaseViewGUI);



lgb.view.LayoutUtil.prototype.init = function() {


};


lgb.view.LayoutUtil.prototype.alignHorizontal = function(alignTo, offset) {
  
  this.alignHorizontal_ = alignTo;
  this.offsetHorizontal_ = offset;

};


/**
 * show the button.
 */
lgb.view.LayoutUtil.prototype.show = function() {
  this.jumpToPosition();
};

/**
 * Set the position.
 */
lgb.view.LayoutUtil.prototype.jumpToPosition = function() {

  var x = this.getXpos_();

  var props = {left: x + 'px'};
    this.element_.css(props);

};



lgb.view.LayoutUtil.prototype.tweenToPosition = function(event) {

    var x = this.getXpos_();

    var options = {
      duration: 500,
      easing: 'easeInOutSine'
  };
  
  var props = {left: x + 'px'};

  this.element_.animate(
      props,
      options
  );
};


/**
 * Get the Xposition for the button.
 * @return {number} The X.
 */
lgb.view.LayoutUtil.prototype.getXpos_ = function() {

  if (this.alignHorizontal_ == lgb.view.LayoutUtil.ALIGN.Right) {
    
    var parentWidth = this.guiView_.jqParent().width();
    var selfWidth = this.guiView_.getMainElement().width();
    
    x = parentWidth - this.offsetHorizontal_ - selfWidth;
  
  } else if (this.alignHorizontal_ == lgb.view.LayoutUtil.ALIGN.Left) {
    x = this.offsetHorizontal_;
  }

    
  return x;

};


lgb.view.LayoutUtil.ALIGN = function() {};

lgb.view.LayoutUtil.ALIGN.Right = 0;
lgb.view.LayoutUtil.ALIGN.Left = 1;
lgb.view.LayoutUtil.ALIGN.Top = 2;
lgb.view.LayoutUtil.ALIGN.Bottom = 3;
lgb.view.LayoutUtil.ALIGN.Center = 4;
lgb.view.LayoutUtil.ALIGN.None = 5;


