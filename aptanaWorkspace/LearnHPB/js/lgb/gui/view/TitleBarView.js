/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.TitleBarView');
goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.gui.view.TitleBarView = function() {
    
    
  this._TITLE='TitleBar';
  lgb.gui.view.BaseViewGUI.call(this);
  
  this.init_();

};
goog.inherits(lgb.gui.view.TitleBarView, lgb.gui.view.BaseViewGUI);



lgb.gui.view.TitleBarView.prototype.init_ = function() {
    
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




