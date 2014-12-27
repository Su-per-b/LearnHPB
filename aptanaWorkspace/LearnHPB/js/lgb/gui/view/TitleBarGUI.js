/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.TitleBarGUI');
goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.TitleBarGUI = function() {
    
    
  this._TITLE='TitleBar';
  lgb.gui.view.BaseGUI.call(this);
  
  this.init_();

};
goog.inherits(lgb.gui.view.TitleBarGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.TitleBarGUI.prototype.init_ = function() {
    
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




