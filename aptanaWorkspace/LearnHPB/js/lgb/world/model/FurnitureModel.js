/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.FurnitureModel');


goog.require('lgb.world.model.BaseModel');


/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.world.model.FurnitureModel = function() {



  
  /**@const */
  this._TITLE = 'Furniture';
  lgb.world.model.BaseModel.call(this);

  this.isVisible = true;
  
  
};
goog.inherits(lgb.world.model.FurnitureModel, lgb.world.model.BaseModel);









