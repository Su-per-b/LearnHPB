/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.TitleBarView');
goog.require('lgb.view.BaseViewGUI');



/**
 * @constructor
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.TitleBarView = function() {
    
  this._NAME = 'lgb.view.TitleBarView';
  
  lgb.view.BaseViewGUI.call(this, null, 'titleBar', lgb.Config.HUD_CONTAINER_STR);

  this.injectHtml_();

};
goog.inherits(lgb.view.TitleBarView, lgb.view.BaseViewGUI);


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


