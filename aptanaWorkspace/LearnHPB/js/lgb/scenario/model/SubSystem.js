/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.SubSystem');
goog.require('lgb.scenario.model.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.scenario.model.Category');
goog.require('lgb.simulation.model.DisplayUnitSystem');

/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.SubSystem = function(node, parent_fqAbbr) {
  this.parent_fqAbbr_ = parent_fqAbbr;
  
  lgb.scenario.model.NodeBase.call(this, node);
};
goog.inherits(lgb.scenario.model.SubSystem, lgb.scenario.model.NodeBase);



lgb.scenario.model.SubSystem.prototype.parseXmlNode_ = function() {
  this.setNameAndAbbr_();
  this.fqAbbr = this.parent_fqAbbr_ + this.abbr;
  
  this.makeChildren_();
};


lgb.scenario.model.SubSystem.childClassMap = {
    "Category" : lgb.scenario.model.Category,
    "Variable" : lgb.scenario.model.Variable
};


