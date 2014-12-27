goog.provide('lgb.integrated.model.Factory');

goog.require('lgb.core.BaseClass');

goog.require('lgb.integrated.model.System');
goog.require('lgb.integrated.model.SubSystem');
goog.require('lgb.integrated.model.Category');
goog.require('lgb.integrated.model.VariableOption');
goog.require('lgb.integrated.model.VariableReal');
goog.require('lgb.integrated.model.VariableInteger');
goog.require('lgb.integrated.model.SecondsAfter2000');

goog.require('lgb.integrated.model.unit.Factory');


lgb.integrated.model.Factory = function() {};



lgb.integrated.model.Factory.makeVariableReference = function(variableReferenceTag ) {


    var v = lgb.integrated.controller.IntegratedController.getInstance().getVariableByName(variableReferenceTag.name);
    
    return v;
    // return lgb.integrated.model.Factory.makeVariable( variableReferenceTag.variable );

};




lgb.integrated.model.Factory.translateTag2Integrated = function(tagObject ) {

    var modelObject = lgb.integrated.model.Factory.translateObjectWithMap (
        tagObject, lgb.integrated.model.Factory.classTag2ModelMap);
    
    
    if (null == modelObject) {
        lgb.logSevere ('null == modelObject');
    }
    
    return modelObject;
    
};





lgb.integrated.model.Factory.translateObject = function(srcObj, map) {
    
    if (undefined == map) {
        var ownClass = this.getClassConstructor();
        map = ownClass.classTranslationMap;
    }
    
    
    var newObject = lgb.translateObjectWithMap(srcObj, map);
    
    if (null == newObject) {
        debugger;
    }
    
    return newObject; 
    

};


lgb.integrated.model.Factory.translateObjectWithMap = function(srcObj, map) {
    
    if (undefined === srcObj) {
        lgb.logSevere('srcObj is undefined');
    }
    
    var fullClassName = srcObj.getFullClassName();
    var functionReference = lgb.integrated.model.Factory.getTranslateFunctionReference(fullClassName, map);
    
    var newObject = functionReference(srcObj);
    return newObject;
};


lgb.integrated.model.Factory.getTranslateFunctionReference = function(fullClassName, map) {
    

    if ( map.hasOwnProperty(fullClassName)  ) {
        var functionRef = map[fullClassName];
        
        if (undefined == functionRef) {
            lgb.logSevere('found entry in map but cannot find translate function for: ' + fullClassName);
            return null;
        } else {
            goog.asserts.assertFunction(functionRef);
            return functionRef;
        }

    } else {
        lgb.logSevere('cannot find entry in map for: ' + fullClassName);
        return null;
    }
    
};



lgb.integrated.model.Factory.makeVariable = function(tagVariable) {

    var tagChild = tagVariable.getChildren()[0];
    
    var fullClassName = tagChild.getFullClassName();
    var map = lgb.integrated.model.Factory.classTranslationMap_Variable;
    
    var functionReference = lgb.integrated.model.Factory.getTranslateFunctionReference(fullClassName, map);
    
    var integratedVariable = functionReference(tagVariable);

    return integratedVariable;
    
};

lgb.integrated.model.Factory.makeVariableReal = function(tagVariable) {

    var variable = new lgb.integrated.model.VariableReal();
    lgb.integrated.model.Factory.makeVariableBase(variable, tagVariable);
    
    return variable;
    
};


lgb.integrated.model.Factory.makeVariableInteger = function(tagVariable) {

    var variable = new lgb.integrated.model.VariableInteger();
    lgb.integrated.model.Factory.makeVariableBase(variable, tagVariable);
    
    return variable;
};


lgb.integrated.model.Factory.makeSecondsAfter2000 = function(tagVariable) {

    var variable = new lgb.integrated.model.SecondsAfter2000();
    lgb.integrated.model.Factory.makeVariableBase(variable, tagVariable);
    
    variable.calcDateObject();
    return variable;
};




lgb.integrated.model.Factory.makeVariableBase = function(variable, tagVariable) {

    variable.name = tagVariable.name;
    variable.scalarVariableName = tagVariable.scalarVariableName;
    variable.scope = tagVariable.scope;
    variable.variability = tagVariable.variability;
    variable.description = tagVariable.description;
    
    var tagChild = tagVariable.getChildren()[0];
    
    variable.min.setInternalValue(tagChild.min);
    variable.max.setInternalValue(tagChild.max);
    variable.start.setInternalValue(tagChild.start);
    variable.setInternalValue(tagChild.start);
    
    var unit = lgb.integrated.model.unit.Factory.makeUnitFromString(tagVariable.definedUnit);
    variable.setUnitObject(unit);
    
    return variable;
    
};




lgb.integrated.model.Factory.makeCategory = function( tagCategory ) {

    var category  = new lgb.integrated.model.Category ();
    
    category.name = tagCategory.name;
    category.description = tagCategory.description;
    
    category.children_ = lgb.integrated.model.Factory.makeChildren_( tagCategory);
    
    return category;
};


lgb.integrated.model.Factory.makeSubSystem = function( tagSubSystem  ) {

    var subSystem  = new lgb.integrated.model.SubSystem ();
    
    subSystem.name = tagSubSystem.name;
    subSystem.description = tagSubSystem.description;
    
    subSystem.children_ = lgb.integrated.model.Factory.makeChildren_( tagSubSystem);
    
    return subSystem;
};

lgb.integrated.model.Factory.makeSystem = function( tagSystem ) {

    var system = new lgb.integrated.model.System();
    
    system.name = tagSystem.name;
    system.description = tagSystem.description;
    system.children_ = lgb.integrated.model.Factory.makeChildren_( tagSystem);
    
    return system;
};



lgb.integrated.model.Factory.makeChildren_ = function(tagObject) {
    
    var childList = tagObject.getChildren();
    var children = [];
    
    if (undefined != childList) {
        var len = childList.length;
        
        for (var i=0; i < len; i++) {
            var tagChild = childList[i];
            
            var childObj = lgb.integrated.model.Factory.translateTag2Integrated (tagChild);
            children.push(childObj);
            
        };

    }

    return children;
    
};


lgb.integrated.model.Factory.makeOneChild_ = function(srcObjChild, children) {
    
     var destChild = lgb.integrated.model.Factory.translateTag2Integrated (srcObjChild);
     children.push(destChild);
};



lgb.integrated.model.Factory.classTag2ModelMap = {
    
    "lgb.scenario.model.tag.System" : lgb.integrated.model.Factory.makeSystem,
    "lgb.scenario.model.tag.SubSystem" : lgb.integrated.model.Factory.makeSubSystem,
    "lgb.scenario.model.tag.Category" : lgb.integrated.model.Factory.makeCategory,
    "lgb.scenario.model.tag.VariableOption" : lgb.integrated.model.Factory.makeVariableOption,
    "lgb.scenario.model.tag.Variable" : lgb.integrated.model.Factory.makeVariable,
    "lgb.scenario.model.tag.VariableReference" : lgb.integrated.model.Factory.makeVariableReference
    
};



lgb.integrated.model.Factory.classTranslationMap_Variable = {
    
  "lgb.scenario.model.tag.Real":lgb.integrated.model.Factory.makeVariableReal,
  "lgb.scenario.model.tag.Integer":lgb.integrated.model.Factory.makeVariableInteger,
  "lgb.scenario.model.tag.SecondsAfter2000":lgb.integrated.model.Factory.makeSecondsAfter2000
    
};








