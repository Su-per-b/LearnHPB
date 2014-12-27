/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.Variable');
goog.require('lgb.scenario.model.tag.NodeBase');

goog.require('lgb.scenario.model.tag.Integer');
goog.require('lgb.scenario.model.vo.OptionList');
goog.require('lgb.scenario.model.tag.Real');
goog.require('lgb.scenario.model.tag.Boolean');
goog.require('lgb.scenario.model.tag.SecondsAfter2000');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.Variable = function(node, parentTag) {

  lgb.scenario.model.tag.NodeBase.call(this, node, parentTag);
  
};
goog.inherits(lgb.scenario.model.tag.Variable, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.tag.Variable.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    },
    "scalarVariableName" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:false
    },
    "scope" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    },
    "variability" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    },
    "definedUnit" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    },
    "description" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    }
    
    
};





lgb.scenario.model.tag.Variable.childMap = {

    "Integer" : {
        classReference:lgb.scenario.model.tag.Integer,
        isRequired:false
    },
    "OptionList" : {
        classReference:lgb.scenario.model.tag.OptionList,
        isRequired:false
    },
    "Real" : {
        classReference:lgb.scenario.model.tag.Real,
        isRequired:false
    },
    "Boolean" : {
        classReference:lgb.scenario.model.tag.Boolean,
        isRequired:false
    },
    "SecondsAfter2000" : {
        classReference:lgb.scenario.model.tag.SecondsAfter2000,
        isRequired:false
    }
    
};

