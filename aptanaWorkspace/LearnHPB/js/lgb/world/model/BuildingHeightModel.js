/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.BuildingHeightModel');

goog.require('lgb.world.model.BaseModel');



/**
 * @constructor
 * @extends lgb.world.model.BaseModel
 */
lgb.world.model.BuildingHeightModel = function(topFloorMaxY,topFloorMinY) {

  /**@const */
  this._TITLE = 'Building';
  lgb.world.model.BaseModel.call(this);
  
  this.topFloorMaxY = topFloorMaxY;
  this.topFloorMinY = topFloorMinY;

  this.floorToCeilingHeight = topFloorMaxY - topFloorMinY;
  
  this.activeFloorMaxY = this.topFloorMaxY - this.floorToCeilingHeight;
  this.activeFloorMinY = this.topFloorMinY - this.floorToCeilingHeight;
  

};
goog.inherits(lgb.world.model.BuildingHeightModel, lgb.world.model.BaseModel);

