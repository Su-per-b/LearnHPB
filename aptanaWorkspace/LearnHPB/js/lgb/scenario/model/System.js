/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.System');

goog.require('lgb.scenario.model.NodeBase');
goog.require('lgb.scenario.model.SubSystem');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.System = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.System, lgb.scenario.model.NodeBase);


lgb.scenario.model.System.prototype.parseXmlNode_ = function(node) {
  this.setNameAndAbbr_();
  this.makeChildrenAbbr_(this.abbr);
};


lgb.scenario.model.System.childClassMap = {
    "SubSystem" : lgb.scenario.model.SubSystem
};


