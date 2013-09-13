/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Integer');
goog.require('lgb.scenario.model.NodeBase');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Integer = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Integer, lgb.scenario.model.NodeBase);



lgb.scenario.model.Integer.prototype.parse_ = function(node) {
  this.setPropertyInt_('min');
  this.setPropertyInt_('max');
  this.setPropertyInt_('default');
};


