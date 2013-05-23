/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.BuildingModel');
goog.provide('lgb.model.BuildingModel.Group');

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


/**
 * @enum {number}
 */
lgb.model.BuildingModel.Group = {
  ALL: 0,
  HVAC: 1,
  ENVELOPE: 2,
  ROOFTOP: 3,
  DUCTWORK: 4,
  LIGHTING: 5
};

