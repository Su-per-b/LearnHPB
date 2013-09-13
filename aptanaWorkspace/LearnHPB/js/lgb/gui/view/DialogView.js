/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.DialogView');

goog.require('lgb.gui.view.BaseViewGUI');

/**
 * @constructor
 * @param {lgb.world.model.BaseModel=} dataModel The data model to display.
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.gui.view.DialogView = function(dataModel, htmlID, parentHtmlID) {
    
  lgb.gui.view.BaseViewGUI.call(this, dataModel, htmlID, parentHtmlID);
  this.subPanels = [];
  this.useSlideEffect = false;

};
goog.inherits(lgb.gui.view.DialogView, lgb.gui.view.BaseViewGUI);


/**
 * Called by the controller I believe.
 * @return {jQuery|jQuery.widget|null} The dialog.
 */
lgb.gui.view.DialogView.prototype.isOpen = function() {
  
  var el = this.getMainElement();
  
  return el.dialog('isOpen');
};


/**
 * shows the Dialog.
 */
lgb.gui.view.DialogView.prototype.show = function(showFlag) {

  
  if(showFlag) {
    this.show_();
  } else {
    this.hide_();
  }


};

/**
 * hide the dialog.
 */
lgb.gui.view.DialogView.prototype.show_ = function() {
  
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
lgb.gui.view.DialogView.prototype.hide_ = function() {
  
  var el = this.getMainElement();

  el.dialog('close');
};
