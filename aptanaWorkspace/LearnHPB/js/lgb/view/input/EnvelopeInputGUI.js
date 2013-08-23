/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.view.input.EnvelopeInputGUI');

goog.require('lgb.view.input.BaseViewGUI');
goog.require('lgb.Config');


/**
 * @constructor
 * @param {lgb.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.view.input.BaseViewGUI}
 */
lgb.view.input.EnvelopeInputGUI = function(dataModel) {
  
  this.layoutID = lgb.Config.LAYOUT_ID.BaseGUI;
  
  lgb.view.input.BaseViewGUI.call(this, dataModel, 'EnvelopeInputGUI');
};
goog.inherits(lgb.view.input.EnvelopeInputGUI, lgb.view.input.BaseViewGUI);


/**
 * Initializes the View
 */
lgb.view.input.EnvelopeInputGUI.prototype.init = function() {
  this.triggerLocal(e.RequestAddToParentGUI);
};


lgb.view.input.EnvelopeInputGUI.prototype.add = function(gui) {
  var el = this.getMainElement();
  gui.appendTo(el, false);
};


lgb.view.input.EnvelopeInputGUI.prototype.inject = function(parentElement) {
  goog.base(this,  'inject', parentElement);
  var el = this.getMainElement();    
  el.append('<br />');
};

