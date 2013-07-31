/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.DialogView');

goog.require('lgb.view.input.BaseViewGUI');

/**
 * @constructor
 * @param {lgb.model.BaseModel=} dataModel The data model to display.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.DialogView = function(dataModel, htmlID, parentHtmlID) {
    
  lgb.view.input.BaseViewGUI.call(this, dataModel, htmlID, parentHtmlID);
  this.subPanels = [];
  this.useSlideEffect = false;

};
goog.inherits(lgb.view.input.DialogView, lgb.view.input.BaseViewGUI);


/**
 * Called by the controller I believe.
 * @return {jQuery|jQuery.widget|null} The dialog.
 */
lgb.view.input.DialogView.prototype.isOpen = function() {
  
  var el = this.getMainElement();
  
  return el.dialog('isOpen');
};


/**
 * shows the Dialog.
 */
lgb.view.input.DialogView.prototype.show = function(showFlag) {

  
  if(showFlag) {
    this.show_();
  } else {
    this.hide_();
  }


};

/**
 * hide the dialog.
 */
lgb.view.input.DialogView.prototype.show_ = function() {
  
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
lgb.view.input.DialogView.prototype.hide_ = function() {
  
  var el = this.getMainElement();

  el.dialog('close');
};
