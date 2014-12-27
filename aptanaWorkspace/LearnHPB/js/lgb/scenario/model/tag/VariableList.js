/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.VariableList');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.scenario.model.tag.Variable');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.VariableList = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.VariableList, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.tag.VariableList.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "scope" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "variability" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "definedUnit" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    }
};




lgb.scenario.model.tag.VariableList.childMap = {

    "Variable" : {
        classReference:lgb.scenario.model.tag.Variable,
        isRequired:true
    }
    
};

