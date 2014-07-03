/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.view.BuildingSubControllerGUI');

goog.require('lgb.world.model.ViewpointModel');
goog.require('lgb.gui.view.BaseGUI');
goog.require('lgb.core.Config');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends lgb.gui.view.BaseGUI
 */
lgb.gui.view.BuildingSubControllerGUI = function(dataModel, title) {
  
  this._TITLE = title;
  lgb.gui.view.BaseGUI.call(this, dataModel);
  
  this.cssClassName_ = "panel input";
  
};
goog.inherits(lgb.gui.view.BuildingSubControllerGUI, lgb.gui.view.BaseGUI);



lgb.gui.view.BuildingSubControllerGUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};


lgb.gui.view.BuildingSubControllerGUI.prototype.calculateLayout = function() {
  
  var el = this.getMainElement();
  
  var h = window.innerHeight;

  
  var p1 = this.getParentElement();
  var h1 = p1.height();
  
 // var p2 = el.parent();
 //  var hh2 = p2.height();
  
  
  var height = (h-295);
  
  el.height(height);
  
  
  return;
};



/*

lgb.gui.view.BuildingSubControllerGUI.prototype.injectInto = function(parentElement) {
  goog.base(this,  'injectInto', parentElement);
};

*/

