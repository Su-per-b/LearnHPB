/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.BasicInputModel');
goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.BasicInputModel = function() {

  /**@const */
  this._TITLE = 'BasicInputModel';

  this.categories = ["Viewpoints", "Airflow", "Settings"];

  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.model.BasicInputModel, lgb.model.BaseModel);


