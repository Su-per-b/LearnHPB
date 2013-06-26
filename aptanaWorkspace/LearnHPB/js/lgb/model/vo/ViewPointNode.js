/**
 * @author Raj Dye - raj@rajdye.com
 * Copyright (c) 2011 Institute for Sustainable Performance of Buildings (Superb)
 */
 
goog.provide('lgb.model.vo.ViewPointNode');

goog.require('lgb.model.vo.BaseVo');



lgb.model.vo.ViewPointNode = function(title, object3d, recurseDepth) {
  
  this.idx = lgb.model.vo.ViewPointNode.idx++;
  lgb.model.vo.ViewPointNode.allNodes[this.idx] = this;
  
  this.title = title;
  recurseDepth = recurseDepth || 0;
  this.children = undefined;
  this.hasChildren = false;
  this.parent = undefined;

  if (object3d && object3d instanceof THREE.Object3D) {
    this.init_(object3d,recurseDepth)
  } else if (object3d && object3d instanceof Array) {
    this.initArray_(object3d);
  }
  
  this.offset_ = new THREE.Vector3(0, 2, 5);

};
goog.inherits(lgb.model.vo.ViewPointNode, lgb.model.vo.BaseVo);



lgb.model.vo.ViewPointNode.prototype.initArray_ = function(ary, recurseDepth) {
    return;    
    this.hasChildren = true;
    this.children = [];
    
    this.each(ary, this.initOneChild_, recurseDepth);
    
    
};

lgb.model.vo.ViewPointNode.prototype.init_ = function(object3d, recurseDepth) {

    
    this.object3d = object3d;

    if (object3d.children.length > 0 && recurseDepth > 0) {
      this.hasChildren = true;
      this.children = [];

      this.each(object3d.children, this.initOneChild_, recurseDepth);
    }
    
    return;
};


lgb.model.vo.ViewPointNode.prototype.initOneChild_ = function(object3dChild, recurseDepth) {
  
    var childNode = new lgb.model.vo.ViewPointNode(object3dChild.name, object3dChild, recurseDepth-1);
    
    childNode.parent = this;
    this.children.push(childNode);
};



lgb.model.vo.ViewPointNode.getNodeByIdx = function(idx) {
  
  var theNode = null;
  var allNodes = lgb.model.vo.ViewPointNode.allNodes;
  
  if(allNodes && allNodes.length > idx ) {
    theNode = allNodes[idx];
  }
  
  return theNode;
};


lgb.model.vo.ViewPointNode.prototype.generateCamera = function() {
    
    var boundingBox;
    
    if (this.object3d && this.object3d instanceof THREE.Mesh) {
        boundingBox = this.object3d.getBoundingBox();
    } else if (this.object3d && this.object3d instanceof THREE.Object3D) {
        boundingBox = this.object3d.getDescendantsBoundingBox();
    } 

    
    this.targetBoundingBox = boundingBox.clone();
        
    this.targetPosition = this.object3d.position.clone();
    this.name = this.object3d.name;
    
    
};





lgb.model.vo.ViewPointNode.prototype.getLookAtPosition = function() {

    var worldPosition = new THREE.Vector3();
    this.object3d.localToWorld(worldPosition);
    
    return worldPosition;
  
};


lgb.model.vo.ViewPointNode.prototype.getCameraPosition = function() {

    
    var cameraPosition = new THREE.Vector3();
    this.object3d.localToWorld(cameraPosition);
    
    cameraPosition.addSelf(this.offset_);
    
    return cameraPosition;
  
};





lgb.model.vo.ViewPointNode.idx = 0;
lgb.model.vo.ViewPointNode.allNodes = [];
