/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Category');
goog.require('lgb.scenario.model.NodeBase');
goog.require('lgb.scenario.model.Variable');
goog.require('lgb.scenario.model.Component');




/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.world.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Category = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Category, lgb.scenario.model.NodeBase);



lgb.scenario.model.Category.prototype.parse_ = function(node) {
  this.setNameAndAbbr_();
  this.makeChildren_();
};


lgb.scenario.model.Category.childClassMap = {
    "Variable" : lgb.scenario.model.Variable,
    "Component" : lgb.scenario.model.Component
};