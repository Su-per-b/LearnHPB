/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.VariableReference');

goog.require('lgb.scenario.model.tag.NodeBase');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.VariableReference = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  this.variable = null;
};
goog.inherits(lgb.scenario.model.tag.VariableReference, lgb.scenario.model.tag.NodeBase);




lgb.scenario.model.tag.VariableReference.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    }

};




