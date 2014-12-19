/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Component');
goog.require('lgb.scenario.model.tag.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Component = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Component, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.Component.prototype.parseXmlNode_ = function() {
  
    this.setPropertyStr_('type');

};

