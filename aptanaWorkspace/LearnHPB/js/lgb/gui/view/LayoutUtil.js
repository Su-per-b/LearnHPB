/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.LayoutUtil');

goog.require('lgb.gui.view.BaseGUI');




/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.LayoutUtil = function(guiView) {
  
  this.guiView_ = guiView;
  this.element_ = guiView.getMainElement();

  lgb.core.BaseController.call(this);

};
goog.inherits(lgb.gui.view.LayoutUtil, lgb.gui.view.BaseGUI);



lgb.gui.view.LayoutUtil.prototype.init = function() {


};


lgb.gui.view.LayoutUtil.prototype.alignHorizontal = function(alignTo, offset) {
  
  this.alignHorizontal_ = alignTo;
  this.offsetHorizontal_ = offset;

};


/**
 * show the button.
 */
lgb.gui.view.LayoutUtil.prototype.show = function() {
  this.jumpToPosition();
};

/**
 * Set the position.
 */
lgb.gui.view.LayoutUtil.prototype.jumpToPosition = function() {

  var x = this.getXpos_();

  var props = {left: x + 'px'};
    this.element_.css(props);

};



lgb.gui.view.LayoutUtil.prototype.tweenToPosition = function(event) {

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
lgb.gui.view.LayoutUtil.prototype.getXpos_ = function() {

  if (this.alignHorizontal_ == lgb.gui.view.LayoutUtil.ALIGN.Right) {
    
    var parentWidth = this.guiView_.getParentElement().width();
    var selfWidth = this.guiView_.getMainElement().width();
    
    var x = parentWidth - this.offsetHorizontal_ - selfWidth;
  
  } else if (this.alignHorizontal_ == lgb.gui.view.LayoutUtil.ALIGN.Left) {
    x = this.offsetHorizontal_;
  }

    
  return x;

};


lgb.gui.view.LayoutUtil.ALIGN = function() {};

lgb.gui.view.LayoutUtil.ALIGN.Right = 0;
lgb.gui.view.LayoutUtil.ALIGN.Left = 1;
lgb.gui.view.LayoutUtil.ALIGN.Top = 2;
lgb.gui.view.LayoutUtil.ALIGN.Bottom = 3;
lgb.gui.view.LayoutUtil.ALIGN.Center = 4;
lgb.gui.view.LayoutUtil.ALIGN.None = 5;


