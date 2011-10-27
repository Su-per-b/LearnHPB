goog.provide('lgb.view.AdminView');
goog.require('lgb.view.DialogView');


/**
 * @constructor
 * @extends {lgb.view.DialogView}
 */
lgb.view.AdminView = function() {
  lgb.view.DialogView.call(this, null);

  this.htmlID = 'adminView';
  this.title = 'Admin';
  this.injectHtml_();
  this.bind_();
  this.useSlideEffect = false;
};
goog.inherits(lgb.view.AdminView, lgb.view.DialogView);

/**
 * adds event handlers
 * @private
 */
lgb.view.AdminView.prototype.bind_ = function() {
	
};


/**
 * Event handler triggered when the user clicks the
 * close button (x) on the dialog.
 * @param {goog.events.Event} event The event received.
 */
lgb.view.AdminView.prototype.onCloseButtonClicked = function(event) {
  this.dispatchLocal(new lgb.event.ViewClosed());
};


/**
 * injects HTML into the DOM
 * @private
 */
lgb.view.AdminView.prototype.injectHtml_ = function() {
  this.makeDialog_();
};



/**
 * injects the dialog panel into the DOM
 * @private
 */
lgb.view.AdminView.prototype.makeDialog_ = function() {
    var jq = $('<div>')
    .attr('id', this.htmlID);
    jq.direction = 'left';
    jq.bind('dialogclose', this.d(this.onCloseButtonClicked));

    jq.appendTo('body');

    this.dialog = jq.dialog({
      title: this.title,
      dialogClass: this.htmlID + '-dialog',
      hide: 'fade',
      width: 325,
      height: 500,
      position: ['right', 'bottom'],
      autoOpen: false
    });
};


