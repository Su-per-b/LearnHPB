/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.OptionList');
goog.require('lgb.scenario.model.NodeBase');
goog.require('lgb.scenario.model.Option');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.OptionList = function(node) {

  lgb.scenario.model.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.OptionList, lgb.scenario.model.NodeBase);



lgb.scenario.model.OptionList.prototype.parseXmlNode_ = function(node) {
  this.makeChildren_();
};


lgb.scenario.model.OptionList.childClassMap = {
    "Option" : lgb.scenario.model.Option
};