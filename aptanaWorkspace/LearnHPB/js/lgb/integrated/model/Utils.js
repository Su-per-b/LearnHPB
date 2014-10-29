goog.provide('lgb.integrated.model.Utils');

goog.require('lgb.core.BaseClass');
goog.require('lgb.integrated.model.VariableReal');
goog.require('lgb.integrated.model.VariableOptionList');
goog.require('lgb.integrated.model.VariableInteger');



 /**
 * @constructor
 */
lgb.integrated.model.Utils = function(  ) {
    

    
};



lgb.integrated.model.Utils.makeVariable = function(scenarioVariable ) {


    var children = scenarioVariable.getChildren();
    var child = children[0];
    
    var integratedVariable = lgb.core.BaseClass.translateObjectWithMap(
        child, lgb.integrated.model.Utils.classTranslationMap);
    
    
    
    if (null == integratedVariable) {
        debugger;
    }
    
    integratedVariable.parseSrcObj(scenarioVariable);
    

    return integratedVariable;
    
};




lgb.integrated.model.Utils.classTranslationMap = {
    
  "lgb.scenario.model.Temperature":lgb.integrated.model.VariableReal,
  "lgb.scenario.model.Decimal":lgb.integrated.model.VariableReal,
  "lgb.scenario.model.Integer":lgb.integrated.model.VariableInteger,
  "lgb.scenario.model.OptionList":lgb.integrated.model.VariableOptionList
    
    
};

