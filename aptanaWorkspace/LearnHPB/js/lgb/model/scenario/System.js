/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.System');

goog.require('lgb.model.scenario.NodeBase');
goog.require('lgb.model.scenario.SubSystem');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.System = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);

};
goog.inherits(lgb.model.scenario.System, lgb.model.scenario.NodeBase);


lgb.model.scenario.System.prototype.parse_ = function(node) {
  this.setNameAndAbbr_();
  this.makeChildren_();
};


lgb.model.scenario.System.childClassMap = {
    "SubSystem" : lgb.model.scenario.SubSystem
};
