/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.GUI');

goog.require('lgb.model.ViewpointModel');
goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.GUI = function(dataModel, title) {
  
  this._TITLE = title;
  lgb.view.input.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.view.input.GUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.GUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.input.GUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};


lgb.view.input.GUI.prototype.inject = function(parentElement) {
  goog.base(this,  'inject', parentElement);
};

