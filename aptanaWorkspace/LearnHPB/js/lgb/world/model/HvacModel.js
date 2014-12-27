/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.HvacModel');

goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.HvacModel = function() {
  this._TITLE = 'Ductwork';
  lgb.core.BaseModel.call(this);

};
goog.inherits(lgb.world.model.HvacModel, lgb.core.BaseModel);



