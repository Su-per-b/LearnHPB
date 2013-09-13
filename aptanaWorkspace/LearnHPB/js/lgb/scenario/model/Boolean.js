/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Boolean');
goog.require('lgb.scenario.model.NodeBase');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.world.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Boolean = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Boolean, lgb.scenario.model.NodeBase);



lgb.scenario.model.Boolean.prototype.parse_ = function(node) {
  
  this.setPropertyBool_('default');  

  
};


