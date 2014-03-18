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
  
  this.init_();
  

  
};
goog.inherits(lgb.gui.model.ScenarioMasterModel, lgb.world.model.BaseModel);



lgb.gui.model.ScenarioMasterModel.prototype.init_ = function() {
  
  this.scenarios_ = [
    {
      name:"Complete Scenario",
      value:"Complete.xml"
    },
    {
      name:"Very Simple Scenario",
      value:"VerySimpleScenario.xml"
    }
    ];
  
  
  
  this.selectedFileName = this.scenarios_[0].value;
  
};


lgb.gui.model.ScenarioMasterModel.prototype.getScenarioList = function() {


 
    return this.scenarios_;

};


