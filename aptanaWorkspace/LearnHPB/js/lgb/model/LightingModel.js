/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.LightingModel');
goog.provide('lgb.model.LightingModel.Type');


goog.require('lgb.model.BaseModel');


/**
 * @constructor
 * @extends lgb.model.BaseModel
 */
lgb.model.LightingModel = function() {


  /**@const */
  this._TITLE = 'Lighting';
  lgb.model.BaseModel.call(this);

  this.lightingType = lgb.model.LightingModel.Type.RECESSED;

};
goog.inherits(lgb.model.LightingModel, lgb.model.BaseModel);




/**
 * @enum {number}
 */
lgb.model.LightingModel.Type = {
  PENDANT: 0,
  RECESSED: 1
};




