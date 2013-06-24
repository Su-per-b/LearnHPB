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
  

};
goog.inherits(lgb.model.vo.ViewPointNode, lgb.model.vo.BaseVo);



lgb.model.vo.ViewPointNode.idx = 0;
lgb.model.vo.ViewPointNode.allNodes = [];
