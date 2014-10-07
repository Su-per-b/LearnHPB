/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.DialogGreenGUI');

goog.require('lgb.gui.view.BaseGUI');

/**
 * @constructor
 * @param {lgb.core.BaseModel=} dataModel The data model to display.
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.DialogGreenGUI = function(dataModel, htmlID, parentHtmlID) {
    
  lgb.gui.view.BaseGUI.call(this, dataModel, htmlID, parentHtmlID);
  this.subPanels = [];
  this.useSlideEffect = false;

};
goog.inherits(lgb.gui.view.DialogGreenGUI, lgb.gui.view.BaseGUI);


/**
 * Called by the controller I believe.
 * @return {jQuery|jQuery.widget|null} The dialog.
 */
lgb.gui.view.DialogGreenGUI.prototype.isOpen = function() {
  
  var el = this.getMainElement();
  
  return el.dialog('isOpen');
};


/**
 * shows the Dialog.
 */
lgb.gui.view.DialogGreenGUI.prototype.show = function(showFlag) {

  
  if(showFlag) {
    this.show_();
  } else {
    this.hide_();
  }


};

/**
 * hide the dialog.
 */
lgb.gui.view.DialogGreenGUI.prototype.show_ = function() {
  
  var el = this.getMainElement();

  var isOpen = this.isOpen();
  
  if (!isOpen) {
    el.dialog('open');

    if (this.useSlideEffect) {
      var widget = el.dialog('widget');

      var result = widget.show('slide', {
        direction: 'right',
        easing: 'swing'
      }, 1000);
    }
  }
};


/**
 * hide the dialog.
 */
lgb.gui.view.DialogGreenGUI.prototype.hide_ = function() {
  
  var el = this.getMainElement();

  el.dialog('close');
};
