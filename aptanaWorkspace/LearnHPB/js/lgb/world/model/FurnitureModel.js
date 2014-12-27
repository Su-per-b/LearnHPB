/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.FurnitureModel');


goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.FurnitureModel = function() {



  
  /**@const */
  this._TITLE = 'Furniture';
  lgb.core.BaseModel.call(this);

  this.isVisible = true;
  
  
};
goog.inherits(lgb.world.model.FurnitureModel, lgb.core.BaseModel);









