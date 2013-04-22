/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.TitleBarView');
goog.require('lgb.view.ViewBase');



/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.TitleBarView = function() {
    
  this._NAME = 'lgb.view.TitleBarView';
  
  lgb.view.ViewBase.call(this, null, 'titleBar', lgb.Config.HUD_CONTAINER_STR);

  this.injectHtml_();

};
goog.inherits(lgb.view.TitleBarView, lgb.view.ViewBase);


/**
 * @private
 */
lgb.view.TitleBarView.prototype.injectHtml_ = function() {
    
    var element = $('<div>')
    .attr('id', this.htmlID)
    .css({
        top: '-69px',
        width: '237px',
        height: '69px',
        'z-index': '101',
        'background-image': 'url(images/top_title2.png)'
      })
    .center({
      vertical: false
    });
    
    this.append(element);


};



lgb.view.TitleBarView.prototype.show = function() {
  this.jumpToPosition();
};


/**
 * used to calculation the position of the element.
 * @return {number} the position x.
 */
lgb.view.TitleBarView.prototype.getXpos_ = function() {
    
  // var w = window.innerWidth;
 // var h = window.innerHeight;
  
  // var x = w - this.jqParent().width() + 20;
  
  
  return 6;
};


/**
 * Compute the location of the window.
 */
lgb.view.TitleBarView.prototype.jumpToPosition = function() {

  var x = this.getXpos_();

  var props = {
    left: x + 'px',
    top: 0
  };
  
  
  this.jq().css(props);
};

lgb.view.TitleBarView.prototype.tweenToPosition = function() {

   var x = this.getXpos_();

   var options = {
      duration: 500,
      easing: 'easeInOutSine'
  };
  var props = {left: x + 'px'};

  this.jq().animate(
      props,
      options
  );

};



/**
 * showe the title bar.

lgb.view.TitleBarView.prototype.show = function() {

    this.jq().animate({
      top: '0',
      easing: 'easeInOutSine'
    }, 500);
};


/**
 * event handler.
lgb.view.TitleBarView.prototype.tweenToPosition = function() {

    var jq = this.jq();

    jq.center({
      vertical: false,
      duration: 500,
      easing: 'easeInOutSine',
      inside:this.jqParent()
    });
};

*/

