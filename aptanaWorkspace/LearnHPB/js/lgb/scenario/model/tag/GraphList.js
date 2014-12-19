/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.GraphList');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.scenario.model.tag.Graph');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.GraphList = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.GraphList, lgb.scenario.model.tag.NodeBase);





lgb.scenario.model.tag.GraphList.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "description" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    }

};



lgb.scenario.model.tag.GraphList.childMap = {

    "Graph" : {
        classReference:lgb.scenario.model.tag.Graph,
        isRequired:true
    }
    
};

