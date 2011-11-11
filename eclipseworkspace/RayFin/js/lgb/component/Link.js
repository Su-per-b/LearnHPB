goog.provide('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');

goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');

/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.view.ViewBase}
 * @param {lgb.component.LinkDataSource} ds the datasource
 * for this component.
 */
lgb.component.Link = function(ds) {
  lgb.view.ViewBase.call(this);
  this.ds = ds;
};
goog.inherits(lgb.component.Link, lgb.view.ViewBase);


/**
 * @return {string} The html string.
 */
lgb.component.Link.prototype.getHTML = function() {

 var html = '<a id="{0}" class="admin-link" href="#">{1}</a> <br />'.
  format(this.ds.htmlID, this.ds.title);

  return html;
};


/**
 * Binds specific event types to functions which handle the events.
 * If no event target is specified then the listener is set  on the global
 * event bus.
 */
lgb.component.Link.prototype.bind = function() {
  var delegateClick = this.d(this.onMouseClick_);
  var delegateOver = this.d(this.onMouseOver_);
  var delegateOut = this.d(this.onMouseOut_);

  var selector = '#{0}'.format(this.ds.htmlID);

  $(selector).click(delegateClick);
  $(selector).hover(delegateOver, delegateOut);
  //$(selector).click(delegateOut);

};


/**'
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseClick_ = function(event) {
  this.dispatchLocal(new lgb.events.MouseClick());
};


/**
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseOver_ = function(event) {
  this.dispatchLocal(new lgb.events.MouseOver());
};


/**'
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseOut_ = function(event) {
  this.dispatchLocal(new lgb.events.MouseOut());
};









