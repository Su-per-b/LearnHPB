/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.Option');
goog.require('lgb.model.scenario.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.Option = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.Option, lgb.model.scenario.NodeBase);



lgb.model.scenario.Option.prototype.parse_ = function(node) {
  
  this.setPropertyStr_('name');
  this.setPropertyStr_('description');
  this.setPropertyBool_('default');
  this.setPropertyBool_('disabled');
  
};

