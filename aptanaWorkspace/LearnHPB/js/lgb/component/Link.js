/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.component.Link');
goog.require('lgb.component.LinkDataSource');



/**
 * Html radio button group that will be inserted into the DOM
 * @constructor
 * @extends {lgb.view.BaseV}
 * @param {lgb.component.LinkDataSource} ds the datasource
 * for this component.
 */
lgb.component.Link = function(ds) {

  
  lgb.view.BaseV.call(this, null, ds.htmlID);
  this.ds = ds;

};
goog.inherits(lgb.component.Link, lgb.view.BaseV);


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


  var el = $('#' + this.ds.htmlID);

  el.click(delegateClick);
  el.hover(delegateOver, delegateOut);

};


lgb.component.Link.prototype.setEnabled = function(isEnabled) {
   
   
   
   
    if (this.ds.isEnabled != isEnabled) {
        this.ds.isEnabled = isEnabled;


        var el = $('#' + this.ds.htmlID);
        
        this.ds.htmlID
        
        if(isEnabled) {
            el.removeClass('admin-link-disabled');
            el.addClass('admin-link');
            
        } else {
            el.removeClass('admin-link');
            el.addClass('admin-link-disabled');
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
        this.triggerLocal(e.MouseClick);
    }

};


/**
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseOver_ = function(event) {
    
    if(this.ds.isEnabled ) {
        this.triggerLocal(e.MouseOver);
    }

};


/**'
 * Event handler
 * @private
 * @param {jQuery.event} event The event.
 */
lgb.component.Link.prototype.onMouseOut_ = function(event) {
    
    if(this.ds.isEnabled ) {
        this.triggerLocal(e.MouseOut);
    }

};









