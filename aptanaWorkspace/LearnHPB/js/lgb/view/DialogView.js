/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.DialogView');

goog.require('lgb.events.ViewClosed');
goog.require('lgb.view.BaseViewGUI');

/**
 * @constructor
 * @param {lgb.model.BaseModel=} dataModel The data model to display.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.DialogView = function(dataModel, htmlID, parentHtmlID) {
    
  lgb.view.BaseViewGUI.call(this, dataModel, htmlID, parentHtmlID);
  this.subPanels = [];
  this.useSlideEffect = false;

};
goog.inherits(lgb.view.DialogView, lgb.view.BaseViewGUI);


/**
 * Called by the controller I believe.
 * @return {jQuery|jQuery.widget|null} The dialog.
 */
lgb.view.DialogView.prototype.isOpen = function() {
  return this.jq().dialog('isOpen');
};


/**
 * shows the Dialog.
 */
lgb.view.DialogView.prototype.show = function() {
  var selector = this.jq();

  if (!this.isOpen()) {
    selector.dialog('open');

    if (this.useSlideEffect) {
      var widget = selector.dialog('widget');

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
lgb.view.DialogView.prototype.hide = function() {
  this.jq().dialog('close');
};
