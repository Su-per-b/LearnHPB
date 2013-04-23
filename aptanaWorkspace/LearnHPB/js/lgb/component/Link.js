/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');

goog.require('lgb.events.MouseClick');
goog.require('lgb.events.MouseOut');
goog.require('lgb.events.MouseOver');

/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.view.BaseView}
 * @param {lgb.component.LinkDataSource} ds the datasource
 * for this component.
 */
lgb.component.Link = function(ds) {
  this._NAME = 'lgb.component.Link';
  
  lgb.view.BaseView.call(this, null, ds.htmlID);
  this.ds = ds;

};
goog.inherits(lgb.component.Link, lgb.view.BaseView);


/**
 * @return {string} The html string.
 */
lgb.component.Link.prototype.getHTML = function() {


  return this.getHTML2() + ' <br />';
};

lgb.component.Link.prototype.getHTML2 = function() {

   var theClass;
   
   if (this.ds.isEnabled) {
       theClass = "admin-link";
   } else {
       theClass = "admin-link-disabled";
   }
 
 var html = '<a id="{0}" class="{1}" href="#">{2}</a>'.
  format(
      this.ds.htmlID,
      theClass, 
      this.ds.title
      );

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


  this.jq().click(delegateClick);
  this.jq().hover(delegateOver, delegateOut);

};


lgb.component.Link.prototype.setEnabled = function(isEnabled) {
   
   
   
   
    if (this.ds.isEnabled != isEnabled) {
        this.ds.isEnabled = isEnabled;


        var element = this.jq();
        
        
        if(isEnabled) {
            element.removeClass('admin-link-disabled');
            element.addClass('admin-link');
            
        } else {
            element.removeClass('admin-link');
            element.addClass('admin-link-disabled');
        }
   
    }
};


/**'
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseClick_ = function(event) {
    
    if(this.ds.isEnabled ) {
        this.dispatchLocal(new lgb.events.MouseClick());
    }

};


/**
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseOver_ = function(event) {
    
    if(this.ds.isEnabled ) {
        this.dispatchLocal(new lgb.events.MouseOver());
    }

};


/**'
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseOut_ = function(event) {
    
    if(this.ds.isEnabled ) {
        this.dispatchLocal(new lgb.events.MouseOut());
    }

};









