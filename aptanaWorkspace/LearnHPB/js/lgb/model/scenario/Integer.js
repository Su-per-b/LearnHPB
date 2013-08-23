/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.Integer');
goog.require('lgb.model.scenario.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.Integer = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.Integer, lgb.model.scenario.NodeBase);



lgb.model.scenario.Integer.prototype.parse_ = function(node) {
  this.setPropertyInt_('min');
  this.setPropertyInt_('max');
  this.setPropertyInt_('default');
  
};


