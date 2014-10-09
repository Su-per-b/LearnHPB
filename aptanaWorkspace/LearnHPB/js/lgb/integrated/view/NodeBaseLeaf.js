/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.NodeBaseLeaf');

goog.require('lgb.integrated.view.NodeBase');


/**
 * @constructor
 * @param {lgb.world.model.ViewpointModel} dataModel The data model to display.
 * @param {string} parentHtmlID the CSS id of the parent to inject into the DOM.
 * @extends {lgb.gui.view.BaseGUIGUI}
 */
lgb.integrated.view.NodeBaseLeaf = function(dataModel, debugFlag) {

  
  lgb.integrated.view.NodeBase.call(this, dataModel, debugFlag);
};
goog.inherits(lgb.integrated.view.NodeBaseLeaf, lgb.integrated.view.NodeBase);



lgb.integrated.view.NodeBaseLeaf.prototype.getLeafNodes = function() {

    return [this];
    
};

