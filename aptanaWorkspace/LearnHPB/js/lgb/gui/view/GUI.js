/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.GUI');

goog.require('lgb.model.ViewpointModel');
goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.gui.view.GUI = function(dataModel, title) {
  
  this._TITLE = title;
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.GUI, lgb.gui.view.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.gui.view.GUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.gui.view.GUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};


/*

lgb.gui.view.GUI.prototype.injectTo = function(parentElement) {
  goog.base(this,  'injectTo', parentElement);
};

*/
