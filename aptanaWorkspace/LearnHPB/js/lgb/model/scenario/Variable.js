/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.Variable');
goog.require('lgb.model.scenario.NodeBase');

goog.require('lgb.model.scenario.Integer');
goog.require('lgb.model.scenario.OptionList');
goog.require('lgb.model.scenario.Decimal');




/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.Variable = function(node) {


  lgb.model.scenario.NodeBase.call(this, node);

  
};
goog.inherits(lgb.model.scenario.Variable, lgb.model.scenario.NodeBase);



lgb.model.scenario.Variable.prototype.parse_ = function(node) {
  
  this.setNameAndAbbr_();
  this.scope = this.getAttribute("scope");
  this.phase = this.getAttribute("phase");
  this.variability = this.getAttribute("variability");
  this.unit = this.getAttribute("unit");

  this.makeChildren_();
  
};


lgb.model.scenario.Variable.prototype.getPropertyNames = function() {
  
  return   ['name', 'abbr', 'scope', 'phase', 'variability', 'unit'];
};




lgb.model.scenario.Variable.childClassMap = {
    "Integer" : lgb.model.scenario.Integer,
    "OptionList" : lgb.model.scenario.OptionList,
    "Decimal" : lgb.model.scenario.Decimal
  }
  

lgb.model.scenario.Variable.propertiesClassMap = {
    "scope" : lgb.model.scenario.Integer,
    "abbr" : lgb.model.scenario.OptionList,
    "Decimal" : lgb.model.scenario.Decimal
}