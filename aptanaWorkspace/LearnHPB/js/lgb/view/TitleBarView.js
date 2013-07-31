/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.TitleBarView');
goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.TitleBarView = function() {
    
    
  this._TITLE='TitleBar';
  
  this.layoutID = lgb.Config.LAYOUT_ID.TitleBar;
  
  lgb.view.input.BaseViewGUI.call(this);
  
  
  
  this.init_();

};
goog.inherits(lgb.view.TitleBarView, lgb.view.input.BaseViewGUI);



lgb.view.TitleBarView.prototype.init_ = function() {
    
    var el = this.getMainElement();
    
    el.css({
        top: '0px',
        width: '237px',
        height: '69px',
        'z-index': '101',
        'background-image': 'url(images/top_title2.png)'
      })
    .center({
      vertical: false
    });
    
    
    this.isVisible_ = true;
};




/*
lgb.view.TitleBarView.prototype.show = function(makeVisible) {
    
  
    if (this.isVisible_ != makeVisible) {
      
      var el = this.getMainElement();
      this.isVisible_ = makeVisible;
      
      el.css( 'display', 'none' );
      
      
    }

};
*/
