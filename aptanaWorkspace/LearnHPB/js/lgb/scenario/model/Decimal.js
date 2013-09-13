/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Decimal');
goog.require('lgb.scenario.model.NodeBase');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.world.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Decimal = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.Decimal, lgb.scenario.model.NodeBase);



lgb.scenario.model.Decimal.prototype.parse_ = function(node) {
  
  this.setPropertyFloat_('min');  
  if (undefined == this.min) {
      this.min = 0.0;
  }
  
  this.setPropertyFloat_('max');
  if (undefined == this.max) {
      this.max = 9999999.0;
  }
  
  this.setPropertyFloat_('default');
  if (undefined == this['default']) {
      this['default'] = 0.0;
  }
  
};


