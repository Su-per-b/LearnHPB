/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.RenderGUI');

goog.require('lgb.gui.view.BaseGUI');


/**
 * @constructor
 * @param {lgb.world.model.VisibilityModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.gui.view.RenderGUI = function(dataModel, htmlID) {

  lgb.gui.view.BaseGUI.call(this, dataModel, htmlID);

};
goog.inherits(lgb.gui.view.RenderGUI, lgb.gui.view.BaseGUI);


/**
 * Initializes the View
 */
lgb.gui.view.RenderGUI.prototype.init = function(renderer) {
  
  this.renderer_  = renderer;
  this.containerDiv_ = $('#' + this.htmlID);
  
  //this.setMainElement();
  
  this.containerDiv_.attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
  $('body').attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
  

};



lgb.gui.view.RenderGUI.prototype.calculateSize = function() {
    
    var w = this.containerDiv_.width();
    var h = this.containerDiv_.height();
    this.renderer_.setSize(w,h);
};




lgb.gui.view.RenderGUI.prototype.bind_ = function() {
  


};



lgb.gui.view.RenderGUI.prototype.injectTo = function(parentElement) {
  
  goog.base(this,  'injectTo', parentElement);
  
  

      
      
      this.bind_();
      

};

