/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.HvacInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.input.HvacInputGUI = function(dataModel) {
  
  this._TITLE = "HVAC";
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'HvacInputGUI');
};
goog.inherits(lgb.view.input.HvacInputGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.HvacInputGUI.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.view.input.HvacInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.HvacInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
  var titleDiv = el.append('<h4>HVAC Stuff</h4>');
  
};

