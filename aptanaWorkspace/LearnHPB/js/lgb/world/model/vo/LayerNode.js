goog.provide('lgb.world.model.vo.LayerNode');

goog.require('lgb.world.model.vo.BaseVo');


/**
 * @constructor
 * @extends {lgb.world.model.vo.BaseVo}
 */
lgb.world.model.vo.LayerNode = function(name, meshName) {
  
  this.name = name;
  this.meshName = meshName;
  this.thickness = 0;
  this.originalPosition = null;
  this.mesh = null;
  this.show = true;
};
goog.inherits(lgb.world.model.vo.LayerNode, lgb.world.model.vo.BaseVo);




lgb.world.model.vo.LayerNode.prototype.init = function(meshWrapper) {
  
    var mesh = meshWrapper.mesh;
    
    var bb = mesh.geometry.getBoundingBoxObject();
  
    this.thickness = (bb.max.z - bb.min.z);
    
    this.originalPosition = meshWrapper.originalPosition;
    this.mesh = mesh;
  
    return;
};



lgb.world.model.vo.LayerNode.prototype.computeThickness = function() {
  
    var bb = this.mesh.geometry.getBoundingBoxObject();
    this.thickness = (bb.max.z - bb.min.z);
  
    return;
};


lgb.world.model.vo.LayerNode.prototype.getScaledThickness = function() {
  
  
  var t = this.thickness * this.mesh.scale.z;
  
  return t;
};