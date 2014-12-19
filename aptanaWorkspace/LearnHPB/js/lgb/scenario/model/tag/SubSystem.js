/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.SubSystem');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.utils.XmlWrapper');
goog.require('lgb.scenario.model.tag.Category');
goog.require('lgb.scenario.model.tag.VariableReference');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.SubSystem = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
};
goog.inherits(lgb.scenario.model.tag.SubSystem, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.tag.SubSystem.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    }

};



lgb.scenario.model.tag.SubSystem.childMap = {

    "Category" : {
        classReference:lgb.scenario.model.tag.Category,
        isRequired:false
    },
    "VariableReference" : {
        classReference:lgb.scenario.model.tag.VariableReference,
        isRequired:false
    }

    
};

