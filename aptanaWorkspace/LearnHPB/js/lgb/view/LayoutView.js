/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.LayoutView');

goog.require('lgb.events.LayoutChange');
goog.require('lgb.events.WindowResize');
goog.require('lgb.view.ViewBase');


/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.LayoutView = function() {
    
  /**@const */
  this._NAME = 'lgb.view.LayoutView';
  
  lgb.view.ViewBase.call(this, null, 'layoutView');


};
goog.inherits(lgb.view.LayoutView, lgb.view.ViewBase);



/**
 * @private
 */
lgb.view.LayoutView.prototype.init = function() {
    
  this.splitterBarWidth_ = 10;
  this.injectHtml_();
   
  this.bind_();
  this.calculateLayout();
  
};

lgb.view.LayoutView.prototype.bind_ = function(event) {

    var k = this.kendoSplitter1_;
    var func = this.d(this.onSplitter1Resize_);
    
    k.bind('resize', func);
    
};




lgb.view.LayoutView.prototype.injectHtml_ = function() {
    
    var w = window.innerWidth;
    var h = window.innerHeight;
  
    this.webGLcanvas_ =
        $('<div>').attr('id', "webGLcanvas");
  
    this.leftPanel_ =
        $('<div>').attr('id', "leftPanel")
                .css({
                      width: w
                  });
                  
                  
            
    this.horizontal_ =
        $('<div>').attr('id', "horizontal")
                .append(this.leftPanel_)
                .append(this.webGLcanvas_);
        
    this.pageContainer_ =
        $('<div>').attr('id', "pageContainer")
                .append(this.horizontal_);
        
  $('body').append(this.pageContainer_);
  
  
  this.horizontal_ = $("#horizontal").kendoSplitter(
      {
        panes: [
            { collapsible: true, size: "190px" },
            { collapsible: false },
        ]
    });
    
    
    this.kendoSplitter1_ = this.horizontal_.data("kendoSplitter");

};


lgb.view.LayoutView.prototype.onSplitter1Resize_ = function(event) {
    
    //this.calculateLayout();
    
    var event = new lgb.events.LayoutChange();
    this.dispatchLocal(event);
};


lgb.view.LayoutView.prototype.triggerSplitter1Resize_ = function(event) {
    
    this.kendoSplitter1_.trigger("resize");
    

};


lgb.view.LayoutView.prototype.calculateLayout = function() {
    
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  var k = this.kendoSplitter1_;
  
  
  
/*

  this.splitter1_.css({
      height: h,
      });
      
*/

  
/*
   this.pageContainer_.css({
      width: w,
      height: h,
      });
      */

    
  //make the page container the full size of the browser window.
  var leftPanelWidth = this.leftPanel_.width();
  
  this.leftPanel_.css({
      height: h,
      });
  
  var webGLcanvasWidth = w - leftPanelWidth - this.splitterBarWidth_;
  var webGLcanvasXposition = leftPanelWidth + this.splitterBarWidth_;

  this.webGLcanvas_.css({
      width: webGLcanvasWidth,
      height: h, 
      top:0, 
      left:webGLcanvasXposition});
  

  
  
  return;

};












