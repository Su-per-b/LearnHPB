/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.BuildingModel');

goog.require('lgb.model.BaseModel');



/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.BuildingModel = function() {

  /**@const */
  this._TITLE = 'Building';

  lgb.model.BaseModel.call(this);

};
goog.inherits(lgb.model.BuildingModel, lgb.model.BaseModel);

