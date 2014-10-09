/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.integrated.view.Variable');

goog.require('lgb.integrated.view.NodeBaseLeaf');
goog.require('goog.events.Event');


/**
 * @constructor
 * @extends {lgb.integrated.view.NodeBase}
 */
lgb.integrated.view.Variable = function(dataModel, debugFlag) {
    
  lgb.integrated.view.NodeBaseLeaf.call(this, dataModel, debugFlag);
  
};
goog.inherits(lgb.integrated.view.Variable, lgb.integrated.view.NodeBaseLeaf);


