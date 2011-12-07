goog.provide('lgb.view.DialogView');

goog.require('lgb.events.ViewClosed');
goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @param {lgb.model.ModelBase=} dataModel The data model to display.
 * @extends {lgb.view.ViewBase}
 */
lgb.view.DialogView = function(dataModel) {
  lgb.view.ViewBase.call(this, dataModel);
  this.subPanels = [];
    this.useSlideEffect = false;
  this._NAME = 'lgb.view.DialogView';
};
goog.inherits(lgb.view.DialogView, lgb.view.ViewBase);


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
