/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.Temperature');
goog.require('lgb.model.scenario.NodeBase');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.Temperature = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.Temperature, lgb.model.scenario.NodeBase);



lgb.model.scenario.Temperature.prototype.parse_ = function(node) {
  
  this.setPropertyFloat_('min');  
  if (undefined == this.min) {
      this.min = 250;
  }
  
  this.setPropertyFloat_('max');
  if (undefined == this.max) {
      this.max = 325;
  }
  
  this.setPropertyFloat_('default');
  if (undefined == this['default']) {
      this['default'] = 295.15;
  }
  
};


