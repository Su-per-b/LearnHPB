/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.BuildingModel');

goog.require('lgb.world.model.BaseModel');



/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.world.model.BuildingModel = function() {

  /**@const */
  this._TITLE = 'Building';

  lgb.world.model.BaseModel.call(this);

};
goog.inherits(lgb.world.model.BuildingModel, lgb.world.model.BaseModel);

