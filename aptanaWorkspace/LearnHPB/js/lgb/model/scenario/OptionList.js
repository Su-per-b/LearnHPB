/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.scenario.OptionList');
goog.require('lgb.model.scenario.NodeBase');
goog.require('lgb.model.scenario.Option');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.model.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.model.scenario.OptionList = function(node) {

  lgb.model.scenario.NodeBase.call(this, node);
  
};
goog.inherits(lgb.model.scenario.OptionList, lgb.model.scenario.NodeBase);



lgb.model.scenario.OptionList.prototype.parse_ = function(node) {
  this.makeChildren_();
};


lgb.model.scenario.OptionList.childClassMap = {
    "Option" : lgb.model.scenario.Option
};