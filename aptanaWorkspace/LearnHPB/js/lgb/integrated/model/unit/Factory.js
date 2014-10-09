goog.provide('lgb.integrated.model.unit.Factory');

goog.require('lgb.integrated.model.unit.ElectricalPower');
goog.require('lgb.integrated.model.unit.Length');
goog.require('lgb.integrated.model.unit.LightingPowerDensity');
goog.require('lgb.integrated.model.unit.LuminousFlux');
goog.require('lgb.integrated.model.unit.None');
goog.require('lgb.integrated.model.unit.Pressure');
goog.require('lgb.integrated.model.unit.Temperature');
goog.require('lgb.integrated.model.unit.VolumetricFlowRate');






 /**
 * @constructor
 */
lgb.integrated.model.unit.Factory = function(  ) {
    
  
};




lgb.integrated.model.unit.Factory.makeUnitFromString = function(unitString) {
    
    var classReference = lgb.integrated.model.unit.Factory.getClassReference(unitString);
    
    if (null == classReference) {
        debugger;  //use lgb.integrated.model.unit.None
    } else {
        var unitObj = new classReference();
        return unitObj;
    }
    
};


lgb.integrated.model.unit.Factory.getClassReference = function(unitString) {

    var map = lgb.integrated.model.unit.Factory.map;
    var classReference;
    
    if ( map.hasOwnProperty(unitString)  ) {
        classReference = lgb.integrated.model.unit.Factory.map[unitString];
    } else {
        //debugger;
        classReference = lgb.integrated.model.unit.None;
    }
   
    return classReference;
    
};



lgb.integrated.model.unit.Factory.map = {
    
  'W':lgb.integrated.model.unit.ElectricalPower,
  'l/m':lgb.integrated.model.unit.VolumetricFlowRate,
  K:lgb.integrated.model.unit.Temperature,
  Pa:lgb.integrated.model.unit.Pressure,
  'W/m^2':lgb.integrated.model.unit.LightingPowerDensity,
  Lumens:lgb.integrated.model.unit.LuminousFlux,
  lm:lgb.integrated.model.unit.LuminousFlux,
  m:lgb.integrated.model.unit.Length,
  second:lgb.integrated.model.unit.None
};




