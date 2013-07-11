/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.LightingInputGUI');

goog.require('lgb.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.input.LightingInputGUI = function(dataModel) {
  
  this._TITLE = "Lighting";
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'LightingInputGUI');
};
goog.inherits(lgb.view.input.LightingInputGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.LightingInputGUI.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.view.input.LightingInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.LightingInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
  var titleDiv = el.append('<h4>Lighting Stuff</h4>');
  
};

