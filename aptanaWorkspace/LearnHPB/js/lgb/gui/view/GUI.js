/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.GUI');

goog.require('lgb.world.model.ViewpointModel');
goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.gui.view.GUI = function(dataModel, title) {
  
  this._TITLE = title;
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
};
goog.inherits(lgb.gui.view.GUI, lgb.gui.view.BaseGUI);



lgb.gui.view.GUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};


/*

lgb.gui.view.GUI.prototype.injectTo = function(parentElement) {
  goog.base(this,  'injectTo', parentElement);
};

*/
