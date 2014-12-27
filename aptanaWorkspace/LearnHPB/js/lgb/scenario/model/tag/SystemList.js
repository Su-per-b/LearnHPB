/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.SystemList');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.scenario.model.tag.System');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.SystemList = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.SystemList, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.tag.SystemList.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "description" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    }
    
    
};



lgb.scenario.model.tag.SystemList.childMap = {

    "System" : {
        classReference:lgb.scenario.model.tag.System,
        isRequired:true
    }
    
};


