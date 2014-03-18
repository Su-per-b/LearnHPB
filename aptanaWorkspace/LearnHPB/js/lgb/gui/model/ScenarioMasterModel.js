/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.ScenarioMasterModel');

goog.require('lgb.world.model.BaseModel');



/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.gui.model.ScenarioMasterModel = function() {

  /**@const */
  this._TITLE = 'ScenarioMasterModel';

  lgb.world.model.BaseModel.call(this);

};
goog.inherits(lgb.gui.model.ScenarioMasterModel, lgb.world.model.BaseModel);


lgb.gui.model.ScenarioMasterModel.prototype.getScenarioList = function() {


    var scenarios = [
    {
      name:"Building",
      fileName:"Building.xml"
    },
    {
      name:"Very Simple Scenario",
      fileName:"VerySimpleScenario.xml"
    }
    ];
    
    
    return scenarios;

};


