/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2014 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.BuildingHeightModel');

goog.require('lgb.core.BaseModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.BuildingHeightModel = function(topFloorMaxY,topFloorMinY) {

  /**@const */
  this._TITLE = 'Building';
  lgb.core.BaseModel.call(this);
  
  this.topFloorMaxY = topFloorMaxY;
  this.topFloorMinY = topFloorMinY;

  this.floorToCeilingHeight = topFloorMaxY - topFloorMinY;
  
  this.activeFloorMaxY = this.topFloorMaxY - this.floorToCeilingHeight;
  this.activeFloorMinY = this.topFloorMinY - this.floorToCeilingHeight;
  

};
goog.inherits(lgb.world.model.BuildingHeightModel, lgb.core.BaseModel);

