/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.BuildingGeneralInputGUI');

goog.require('lgb.world.model.ViewpointModel');
goog.require('lgb.gui.view.BaseViewGUI');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseViewGUI}
 */
lgb.gui.view.BuildingGeneralInputGUI = function(dataModel) {
  
  lgb.gui.view.BaseViewGUI.call(this, dataModel);
};
goog.inherits(lgb.gui.view.BuildingGeneralInputGUI, lgb.gui.view.BaseViewGUI);



/**
 * Initializes the View
 */
lgb.gui.view.BuildingGeneralInputGUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.gui.view.BuildingGeneralInputGUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};
BuildingGeneralInputGUI

