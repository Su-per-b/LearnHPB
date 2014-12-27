/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.gui.model.ScenarioMasterModel');

goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.gui.model.ScenarioMasterModel = function() {

  /**@const */
  this._TITLE = 'ScenarioMasterModel';
  
  lgb.core.BaseModel.call(this);
  
  this.init_();
  

  
};
goog.inherits(lgb.gui.model.ScenarioMasterModel, lgb.core.BaseModel);



lgb.gui.model.ScenarioMasterModel.prototype.init_ = function() {
  
  this.scenarios_ = [
    {
      name:"Simple Scenario 1",
      value:"SimpleScenario1"
    },
    {
      name:"Very Simple Scenario 1",
      value:"VerySimpleScenario1"
    },
    {
      name:"Very Simple Scenario 5",
      value:"VerySimpleScenario5"
    },
    {
      name:"Very Simple Scenario 9",
      value:"VerySimpleScenario9"
    }

    ];
  
  
  
  this.selectedFileName = this.scenarios_[0].value;
  
};


lgb.gui.model.ScenarioMasterModel.prototype.getScenarioList = function() {


 
    return this.scenarios_;

};


