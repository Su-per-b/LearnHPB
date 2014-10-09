goog.provide('lgb.simulation.model.voClient.Utils');

goog.require('lgb.simulation.model.BaseModel');
goog.require('lgb.simulation.model.voClient.MergedVariableReal');
goog.require('lgb.simulation.model.voClient.MergedVariableOptionList');



 /**
 * @constructor
 */
lgb.simulation.model.voClient.Utils = function(  ) {
    

    
};
goog.inherits(lgb.simulation.model.voClient.Utils, lgb.simulation.model.BaseModel);



lgb.simulation.model.voClient.Utils.prototype.xxx = function() {

    
    
};


lgb.simulation.model.voClient.Utils.makeMergedVariable = function(scenarioVariable ) {

    var mergedVariable;
      
      
    var children = scenarioVariable.getChildren();
    var child = children[0];
    
    var className = child.getClassName();
    
    var classReference = lgb.simulation.model.voClient.Utils.getClassReference(className);
    
    var mergedVariable = new classReference();
    mergedVariable.setScenarioVariable(scenarioVariable);
    
    
    return mergedVariable;
    
};


lgb.simulation.model.voClient.Utils.getClassReference = function(str) {

    var map = lgb.simulation.model.voClient.Utils.map;
    var classReference;
    
    if ( map.hasOwnProperty(str)  ) {
        classReference = lgb.simulation.model.voClient.Utils.map[str];
    } else {
        debugger;
    }
   
    return classReference;
    
};








lgb.simulation.model.voClient.Utils.map = {
    
  Temperature:lgb.simulation.model.voClient.MergedVariableReal,
  Decimal:lgb.simulation.model.voClient.MergedVariableReal,
  OptionList:lgb.simulation.model.voClient.MergedVariableOptionList
    
    
};


