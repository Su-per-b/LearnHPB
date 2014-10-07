/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
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
      name:"Very Simple Scenario",
      value:"VerySimpleScenario"
    },
    {
      name:"Simple Scenario",
      value:"SimpleScenario"
    },
    {
      name:"Complete Scenario",
      value:"Complete"
    }
    ];
  
  
  
  this.selectedFileName = this.scenarios_[0].value;
  
};


lgb.gui.model.ScenarioMasterModel.prototype.getScenarioList = function() {


 
    return this.scenarios_;

};


