/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */

goog.provide('lgb.view.UtilityGridView');

goog.require('lgb.view.ViewBase');

/**
 * @constructor
 * @extends {lgb.view.ViewBase}
 */
lgb.view.UtilityGridView = function() {
  lgb.view.ViewBase.call(this);

  this._NAME = 'lgb.view.UtilityGridView';
};
goog.inherits(lgb.view.UtilityGridView, lgb.view.ViewBase);

/**
 * Initializes the View
 */
lgb.view.UtilityGridView.prototype.init = function() {

  var line_material = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0xffffff,
    opacity : 0.4,
    transparent : true
  });

  var line_material_red = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0xff0000,
    opacity : 1,
    transparent : false
  });
  
  
  var line_material_red_desaturate = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0x663333,
    opacity : 1,
    transparent : false
  });
  
  
  var line_material_green = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0x00ff00,
    opacity : 1,
    transparent : false
  });
  
  var line_material_green_desaturate = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0x336633,
    opacity : 1,
    transparent : false
  });
  
  
  var line_material_blue = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0x0000ff,
    opacity : 1,
    transparent : false
  });
  
  
  
  var line_material_blue_desaturate = new THREE.LineBasicMaterial({
    linewidth : 1,
    color : 0x333366,
    opacity : 1,
    transparent : false
  });
  
  
  
  var geometryPlaneXZ = new THREE.Geometry();

  var geometryXpositive = new THREE.Geometry();
  var geometryXnegative = new THREE.Geometry();
  
  var geometryYpositive = new THREE.Geometry();
  var geometryYnegative = new THREE.Geometry();
  
  var geometryZpositive = new THREE.Geometry();
  var geometryZnegative = new THREE.Geometry();
  

  var ORIGIN_X = 0.0;
  var ORIGIN_Y = 0.0;
  var ORIGIN_Z = 0.0;
  
  
  var step = 1;
  var halfWidth = 20;

  var squaresOnEachSide = halfWidth / step * 2;
  

  var positiveEdge = halfWidth;
  var negativeEdge = -1 * halfWidth;;
  
  
  var delta = 0;
  
  for (var i = 0; i < squaresOnEachSide + 1; i++) {
    
    delta =  i * step  - halfWidth;
    
    
    
    
    if (i == halfWidth ) {
      
      //draws a line parallel with x axis
      geometryXpositive.vertices.push(new THREE.Vector3(ORIGIN_X, ORIGIN_Y, delta));
      geometryXpositive.vertices.push(new THREE.Vector3(positiveEdge, ORIGIN_Y, delta));
      
      geometryXnegative.vertices.push(new THREE.Vector3(ORIGIN_X, ORIGIN_Y, delta));
      geometryXnegative.vertices.push(new THREE.Vector3(negativeEdge, ORIGIN_Y, delta));
      
      geometryYpositive.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, ORIGIN_Z));
      geometryYpositive.vertices.push(new THREE.Vector3(delta, positiveEdge, ORIGIN_Z));
      
      geometryYnegative.vertices.push(new THREE.Vector3(delta, negativeEdge, ORIGIN_Z));
      geometryYnegative.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, ORIGIN_Z));
      
      
      geometryZpositive.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, ORIGIN_Z));
      geometryZpositive.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, positiveEdge));
      
      geometryZnegative.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, negativeEdge));
      geometryZnegative.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, ORIGIN_Z));
        
      continue;
    }

    //draws a line parallel with x axis
    geometryPlaneXZ.vertices.push(new THREE.Vector3(negativeEdge, ORIGIN_Y, delta));
    geometryPlaneXZ.vertices.push(new THREE.Vector3(positiveEdge, ORIGIN_Y, delta));
    
    //draws a line parallel with z axis
    geometryPlaneXZ.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, negativeEdge));
    geometryPlaneXZ.vertices.push(new THREE.Vector3(delta, ORIGIN_Y, positiveEdge));
    
  }
  

    var planeXY = new THREE.Line(geometryPlaneXZ, line_material, THREE.LinePieces);
    
    var lineXpositive = new THREE.Line(geometryXpositive, line_material_red, THREE.LinePieces);
    var lineXnegative = new THREE.Line(geometryXnegative, line_material_red_desaturate, THREE.LinePieces);
    
    var lineYpositive = new THREE.Line(geometryYpositive, line_material_blue, THREE.LinePieces);
    var lineYnegative = new THREE.Line(geometryYnegative, line_material_blue_desaturate, THREE.LinePieces);
    
    var lineZpositive = new THREE.Line(geometryZpositive, line_material_green, THREE.LinePieces);
    var lineZnegative = new THREE.Line(geometryZnegative, line_material_green_desaturate, THREE.LinePieces);
    
    
    

    this.requestAddToWorld(lineXpositive);
    this.requestAddToWorld(lineXnegative);
    
    this.requestAddToWorld(lineYpositive);
    this.requestAddToWorld(lineYnegative);
    
    this.requestAddToWorld(lineZpositive);
    this.requestAddToWorld(lineZnegative);
    

    this.requestAddToWorld(planeXY);

};
