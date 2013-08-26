/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.SubSystem');
goog.require('lgb.model.scenario.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.model.scenario.Category');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.SubSystem = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.SubSystem, lgb.model.scenario.NodeBase);



lgb.model.scenario.SubSystem.prototype.parse_ = function(node) {
  this.setNameAndAbbr_();
  this.makeChildren_();
};



lgb.model.scenario.SubSystem.childClassMap = {
    "Category" : lgb.model.scenario.Category,
    "Variable" : lgb.model.scenario.Variable
};