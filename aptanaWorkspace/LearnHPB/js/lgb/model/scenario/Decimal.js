/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.Decimal');
goog.require('lgb.model.scenario.NodeBase');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.Decimal = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.Decimal, lgb.model.scenario.NodeBase);



lgb.model.scenario.Decimal.prototype.parse_ = function(node) {
  this.setPropertyFloat_('min');
  this.setPropertyFloat_('max');
  this.setPropertyFloat_('default');
};


