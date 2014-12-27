/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.vo.OptionList');
goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.scenario.model.vo.Option');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.vo.OptionList = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.vo.OptionList, lgb.scenario.model.tag.NodeBase);



lgb.scenario.model.vo.OptionList.prototype.parseXmlNode_ = function(node) {
  this.makeChildren_();
};


lgb.scenario.model.vo.OptionList.childClassMap = {
    "Option" : lgb.scenario.model.vo.Option
};