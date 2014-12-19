/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.scenario.model.tag.Scenario');

goog.require('lgb.scenario.model.tag.NodeBase');
goog.require('lgb.scenario.model.tag.VariableList');
goog.require('lgb.scenario.model.tag.SystemList');
goog.require('lgb.utils.XmlWrapper');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 * @param {!lgb.utils.XmlWrapper} xmlParser The parse used
 * to populate the object, contains an xml document.
 */
lgb.scenario.model.tag.Scenario = function(node) {

  lgb.scenario.model.tag.NodeBase.call(this, node);
  
};
goog.inherits(lgb.scenario.model.tag.Scenario, lgb.scenario.model.tag.NodeBase);


lgb.scenario.model.tag.Scenario.prototype.parseXmlNode_ = function() {
  
  
    this.makeAttributes_();
    this.makeChildren_();
    
    this.variableMap_ = {
       name : {}
    };


    this.variableListAll_ = [];
    this.variableReferenceAry_ = [];
    
    //consolidate multiple variableLists
    var arrayOfvariableListTags = this.getChildren('VariableList');
    this.each(arrayOfvariableListTags, this.parseOneVariableList_);
    
    this.each(this.variableListAll_, this.parseOneVariable_);
    
    //replace VariableReferences
    var systemListObject = this.getChildren('SystemList')[0];
    this.systemObjectAry = systemListObject.getChildren('System');
    
    this.each(this.systemObjectAry, this.parseOneSystem_);
    this.each(this.variableReferenceAry_, this.parseVariableReference_);
    
    return;
};


lgb.scenario.model.tag.Scenario.prototype.getVariableList = function() {
    
    return this.variableListAll_;
};

lgb.scenario.model.tag.Scenario.prototype.parseVariableReference_ = function(variableReference) {
    
    var name = variableReference.name;
    
    if (this.variableMap_.name.hasOwnProperty(name)) {

        variableReference.variable = this.variableMap_.name[name];
        
        return;

    } else {

        var errorMsg = 'variableReference cannot be resolved to varaible named: ' + name;
        console.error(errorMsg); debugger;
        return;
    }

    return;
};


lgb.scenario.model.tag.Scenario.prototype.parseOneSystem_ = function(system) {
    
    var subSystemAry = system.getChildren('SubSystem');
    if (undefined != subSystemAry) {
        this.each(subSystemAry, this.parseOneSubSystem_);
    }

    return;
};

lgb.scenario.model.tag.Scenario.prototype.parseOneSubSystem_ = function(subSystem) {
    
    var categoryAry = subSystem.getChildren('Category');
    
    var variableReferenceAry = subSystem.getChildren('VariableReference');
    
    if (undefined != variableReferenceAry) {
        this.variableReferenceAry_ = this.variableReferenceAry_.concat(variableReferenceAry.slice(0));
    }
    
    if (undefined != categoryAry) {
        this.each(categoryAry, this.parseOneCategory_);
    }
    
    return;
};

lgb.scenario.model.tag.Scenario.prototype.parseOneCategory_ = function(category) {
    
    var variableReferenceAry = category.getChildren('VariableReference');
    
    if (undefined != variableReferenceAry) {
        this.variableReferenceAry_ = this.variableReferenceAry_.concat(variableReferenceAry.slice(0));
    }
   
    
    return;
};


lgb.scenario.model.tag.Scenario.prototype.parseOneVariableList_ = function(variableListTag) {
    
    this.variableListAll_ = this.variableListAll_.concat(variableListTag.children_.slice(0));
    
    return;
};


lgb.scenario.model.tag.Scenario.prototype.parseOneVariable_ = function(srcObjVariable) {

    this.variableMap_.name[srcObjVariable.name] = srcObjVariable;
    
    return;
};



lgb.scenario.model.tag.Scenario.attributeMap = {

    "name" : {
        classReference:lgb.scenario.model.attribute.String,
        isRequired:true
    }
    
};


lgb.scenario.model.tag.Scenario.childMap = {

    "GraphList" : {
        classReference:lgb.scenario.model.tag.GraphList,
        isRequired:true
    },
    "VariableList" : {
        classReference:lgb.scenario.model.tag.VariableList,
        isRequired:true
    },
    "SystemList" : {
        classReference:lgb.scenario.model.tag.SystemList,
        isRequired:false
    }
    
};


