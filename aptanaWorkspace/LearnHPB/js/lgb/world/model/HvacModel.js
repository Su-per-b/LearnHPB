/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.HvacModel');

goog.require('lgb.world.model.BaseModel');


/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.world.model.HvacModel = function() {
  this._TITLE = 'Ductwork';
  lgb.world.model.BaseModel.call(this);

};
goog.inherits(lgb.world.model.HvacModel, lgb.world.model.BaseModel);



