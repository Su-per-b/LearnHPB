/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.System');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.scenario.model.tag.SubSystem');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.System = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.System, lgb.scenario.model.tag.NodeBase);



lgb.scenario.model.tag.System.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    },
    "description" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    }
    
    
};



lgb.scenario.model.tag.System.childMap = {

    "SubSystem" : {
        classReference:lgb.scenario.model.tag.SubSystem,
        isRequired:true
    }
    
};

