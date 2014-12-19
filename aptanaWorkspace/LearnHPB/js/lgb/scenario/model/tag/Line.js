/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.Line');
goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.utils.XmlWrapper');


/**
 * Primarily a container object for Sysvars
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.Line = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.Line, lgb.scenario.model.tag.NodeBase);





lgb.scenario.model.tag.Line.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    },
    "description" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    }

};


