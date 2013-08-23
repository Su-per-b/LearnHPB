/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.Category');
goog.require('lgb.model.scenario.NodeBase');
goog.require('lgb.model.scenario.Variable');
goog.require('lgb.model.scenario.Component');




/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.Category = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.Category, lgb.model.scenario.NodeBase);



lgb.model.scenario.Category.prototype.parse_ = function(node) {
  this.setNameAndAbbr_();
  this.makeChildren_();
};


lgb.model.scenario.Category.childClassMap = {
    "Variable" : lgb.model.scenario.Variable,
    "Component" : lgb.model.scenario.Component
};