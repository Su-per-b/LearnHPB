goog.provide('lgb.integrated.model.unit.Factory');

goog.require('lgb.integrated.model.unit.ElectricalPower');
goog.require('lgb.integrated.model.unit.Length');
goog.require('lgb.integrated.model.unit.LightingPowerDensity');
goog.require('lgb.integrated.model.unit.LuminousFlux');
goog.require('lgb.integrated.model.unit.None');
goog.require('lgb.integrated.model.unit.Pressure');
goog.require('lgb.integrated.model.unit.Temperature');
goog.require('lgb.integrated.model.unit.VolumetricFlowRate');
goog.require('lgb.integrated.model.unit.Seconds');





 /**
 * @constructor
 */
lgb.integrated.model.unit.Factory = function(  ) {
    
  
};




lgb.integrated.model.unit.Factory.makeUnitFromString = function(definedUnitString) {
    
    var classReference = lgb.integrated.model.unit.Factory.getClassReference(definedUnitString);
    
    if (null == classReference) {
        debugger;  //use lgb.integrated.model.unit.None
    } else {
        var unitObj = new classReference();
        return unitObj;
    }
    
};


lgb.integrated.model.unit.Factory.getClassReference = function(definedUnitString) {

    var map = lgb.integrated.model.unit.Factory.map;
    var classReference;
    
    if ( map.hasOwnProperty(definedUnitString)  ) {
        classReference = lgb.integrated.model.unit.Factory.map[definedUnitString];
    } else {
        //debugger;
        classReference = lgb.integrated.model.unit.None;
    }
   
    return classReference;
    
};


lgb.integrated.model.unit.Factory.map = {
    
  SecondsAfter2000:lgb.integrated.model.unit.SecondsAfter2000,
  Seconds:lgb.integrated.model.unit.Seconds,
  None:lgb.integrated.model.unit.None,
  Temperature:lgb.integrated.model.unit.Temperature
  
};


// lgb.integrated.model.unit.Factory.map = {
//     
  // 'W':lgb.integrated.model.unit.ElectricalPower,
  // 'l/m':lgb.integrated.model.unit.VolumetricFlowRate,
  // K:lgb.integrated.model.unit.Temperature,
  // Pa:lgb.integrated.model.unit.Pressure,
  // 'W/m^2':lgb.integrated.model.unit.LightingPowerDensity,
  // Lumens:lgb.integrated.model.unit.LuminousFlux,
  // lm:lgb.integrated.model.unit.LuminousFlux,
  // m:lgb.integrated.model.unit.Length,
  // second:lgb.integrated.model.unit.None
// };
// 



