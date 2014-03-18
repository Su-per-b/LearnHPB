/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.BuildingGeneralGUI');

goog.require('lgb.world.model.ViewpointModel');
goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUI}
 */
lgb.gui.view.BuildingGeneralGUI = function(dataModel) {
  
  lgb.gui.view.BaseGUI.call(this, dataModel);
};
goog.inherits(lgb.gui.view.BuildingGeneralGUI, lgb.gui.view.BaseGUI);



/**
 * Initializes the View
 */
lgb.gui.view.BuildingGeneralGUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.gui.view.BuildingGeneralGUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};


