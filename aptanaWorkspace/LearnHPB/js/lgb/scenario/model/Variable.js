/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.Variable');
goog.require('lgb.scenario.model.NodeBase');

goog.require('lgb.scenario.model.Integer');
goog.require('lgb.scenario.model.OptionList');
goog.require('lgb.scenario.model.Decimal');
goog.require('lgb.scenario.model.Boolean');
goog.require('lgb.scenario.model.Temperature');



/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.world.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.Variable = function(node) {


  lgb.scenario.model.NodeBase.call(this, node);

  
};
goog.inherits(lgb.scenario.model.Variable, lgb.scenario.model.NodeBase);



lgb.scenario.model.Variable.prototype.parse_ = function(node) {
  
  this.setNameAndAbbr_();
  this.scope = this.getAttribute("scope");
  this.phase = this.getAttribute("phase");
  this.variability = this.getAttribute("variability");
  this.unit = this.getAttribute("unit");
  this.modName = this.getAttribute("modName");

  this.makeChildren_();
  
};


lgb.scenario.model.Variable.prototype.getPropertyNames = function() {
  
  return   ['name', 'abbr', 'scope', 'phase', 'variability', 'unit', 'modName'];
};




lgb.scenario.model.Variable.childClassMap = {
    "Integer" : lgb.scenario.model.Integer,
    "OptionList" : lgb.scenario.model.OptionList,
    "Decimal" : lgb.scenario.model.Decimal,
    "Boolean" : lgb.scenario.model.Boolean,
    "Temperature" : lgb.scenario.model.Temperature,
};
  
