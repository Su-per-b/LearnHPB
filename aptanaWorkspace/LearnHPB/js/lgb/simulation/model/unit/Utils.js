goog.provide('lgb.simulation.model.unit.Utils');

goog.require('lgb.simulation.model.unit.Temperature');
goog.require('lgb.simulation.model.unit.Pressure');
goog.require('lgb.simulation.model.unit.ElectricalPower');




 /**
 * @constructor
 */
lgb.simulation.model.unit.Utils = function(  ) {
    
  
};





lgb.simulation.model.unit.Utils.makeUnitFromString = function(unitString) {
    
    var classReference = lgb.simulation.model.unit.Utils.getClassReference(unitString);
    
    if (null == classReference) {
        return null;
    } else {
        var unitObj = new classReference();
        return unitObj;
    }
    
};


lgb.simulation.model.unit.Utils.getClassReference = function(unitString) {

    var map = lgb.simulation.model.unit.Utils.map;
    var classReference;
    
    if ( map.hasOwnProperty(unitString)  ) {
        classReference = lgb.simulation.model.unit.Utils.map[unitString];
    } else {
        //debugger;
        classReference = null;
    }
   
    return classReference;
    
};



lgb.simulation.model.unit.Utils.map = {
    
  K:lgb.simulation.model.unit.Temperature,
  Pa:lgb.simulation.model.unit.Pressure,
  W:lgb.simulation.model.unit.ElectricalPower
    
    
};




