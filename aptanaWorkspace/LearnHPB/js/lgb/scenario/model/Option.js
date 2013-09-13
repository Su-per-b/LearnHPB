/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Option');
goog.require('lgb.scenario.model.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Option = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Option, lgb.scenario.model.NodeBase);



lgb.scenario.model.Option.prototype.parse_ = function(node) {
  
  this.setPropertyStr_('name');
  this.setPropertyStr_('description');
  this.setPropertyBool_('default');
  this.setPropertyBool_('disabled');
  
};

