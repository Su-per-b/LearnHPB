/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.Boolean');
goog.require('lgb.scenario.model.tag.NodeBase');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.Boolean = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.Boolean, lgb.scenario.model.tag.NodeBase);



lgb.scenario.model.tag.Boolean.attributeMap = {

    "start" : {
        classReference:lgb.scenario.model.attribute.Boolean,
        isRequired:false,
        defaultValue: false
    }
    
};


