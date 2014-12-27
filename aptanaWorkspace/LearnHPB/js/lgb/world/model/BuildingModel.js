/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.BuildingModel');

goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.BuildingModel = function() {

  /**@const */
  this._TITLE = 'Building';

  lgb.core.BaseModel.call(this);

};
goog.inherits(lgb.world.model.BuildingModel, lgb.core.BaseModel);

