/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.DayLightingInputGUI');

goog.require('lgb.view.BaseViewGUI');



/**
 * @constructor
 * @param {lgb.model.ViewPointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.BaseViewGUI}
 */
lgb.view.input.DayLightingInputGUI = function(dataModel) {
  
  this._TITLE = "Day Lighting";
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.BaseViewGUI.call(this, dataModel, 'DayLightingInputGUI');
};
goog.inherits(lgb.view.input.DayLightingInputGUI, lgb.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.DayLightingInputGUI.prototype.init = function() {
  
    this.triggerLocal(e.RequestAddToParentGUI);
};




lgb.view.input.DayLightingInputGUI.prototype.bind_ = function() {
  


      
}


lgb.view.input.DayLightingInputGUI.prototype.inject = function(parentElement) {
  
  goog.base(this,  'inject', parentElement);
  
  var el = this.getMainElement();
  var titleDiv = el.append('<h4>Day Lighting Stuff</h4>');
  
};

