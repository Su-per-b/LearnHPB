/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.LightingModel');
goog.provide('lgb.world.model.LightingModel.Type');


goog.require('lgb.core.BaseModel');


/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.LightingModel = function() {


  /**@const */
  this._TITLE = 'Lighting';
  lgb.core.BaseModel.call(this);

  this.lightingType = lgb.world.model.LightingModel.Type.RECESSED;

};
goog.inherits(lgb.world.model.LightingModel, lgb.core.BaseModel);




/**
 * @enum {number}
 */
lgb.world.model.LightingModel.Type = {
  PENDANT: 0,
  RECESSED: 1
};




