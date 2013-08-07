/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.FurnitureModel');


goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.FurnitureModel = function() {



  
  /**@const */
  this._TITLE = 'Furniture';
  lgb.model.BaseModel.call(this);

  this.isVisible = true;
  
  
};
goog.inherits(lgb.model.FurnitureModel, lgb.model.BaseModel);









