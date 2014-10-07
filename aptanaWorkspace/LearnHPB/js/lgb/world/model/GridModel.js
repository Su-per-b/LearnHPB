/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.world.model.GridModel');



/**
 * @constructor
 * @extends lgb.core.BaseModel
 */
lgb.world.model.GridModel = function(jsonObject, geometryDimensions) {


  /**@const */
  this._TITLE = 'GridModel';
  
  this.position = new THREE.Vector3(
    jsonObject.position[0],
    jsonObject.position[1],
    jsonObject.position[2]
  );
  
  this.geometryDimensions = geometryDimensions;
  this.columnCount = jsonObject.columnCount;
  this.rowCount = jsonObject.rowCount;
  
  this.width = jsonObject.width;
  this.depth = jsonObject.depth;
   
  this.calculateSpacing_();
  this.calculatePosition_();
  
  
};




lgb.world.model.GridModel.prototype.calculatePosition_ = function() {


  var xPos = this.position.x +
  (-1 * (this.dimensions.x / 2)) + 
  (this.geometryDimensions.x / 2) + 
  (this.rowSpacing / 2);
  
  var zPos = this.position.z +
  (-1 * (this.dimensions.z / 2)) + 
  (this.geometryDimensions.z / 2) +
  (this.columnSpacing/ 2);
  
  var yPos = this.position.y + (1 * this.geometryDimensions.y / 2);

  this.centeredPosition  = new THREE.Vector3(
    xPos,
    yPos,
    zPos
  );
  
};
 
 
lgb.world.model.GridModel.prototype.calculateSpacing_ = function() {

  var totalLightX = this.geometryDimensions.x * this.columnCount;
  var totalLightZ = this.geometryDimensions.z * this.rowCount;
  
  var totalSpaceX = this.width - totalLightX;
  var totalSpaceZ = this.depth - totalLightZ;
  
  this.columnSpacing = totalSpaceX / (this.columnCount);
  this.rowSpacing = totalSpaceZ / (this.rowCount);
  
  this.dimensions = new THREE.Vector3(
    totalLightX + totalSpaceX,
    this.geometryDimensions.y,
    totalLightZ + totalSpaceZ
  );
  
};
 
 
 
/**
 * 
 */
lgb.world.model.GridModel.prototype.getCellPosition = function(rowNumber, columnNumber) {

  var x = (this.columnSpacing * columnNumber) + (this.geometryDimensions.x * columnNumber);
  var z = (this.rowSpacing * rowNumber) +(this.geometryDimensions.z * rowNumber);

  var cellPosition = new THREE.Vector3(
    x,
    0,
    z
  );
  
  
  return cellPosition;
};



/**
 * 
 */
lgb.world.model.GridModel.prototype.getDimensions = function() {

  var xSpan =  this.columnCount * this.columnSpacing;
  var zSpan =  this.rowCount * this.rowSpacing;
  var dimensions = new THREE.Vector2(xSpan, zSpan);

  return dimensions;
};



